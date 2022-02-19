import './App.css';
import WordList from 'components/WordList'
import CandidateList from 'components/CandidateList';
import React from 'react';

const axios = require('axios');

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      candidates: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  greenBack = 'rgb(106, 170, 100)';
  greyBack = 'rgb(120, 124, 126)';
  yellowBack = 'rgb(202, 180, 88)';

  handleSubmit() {
    const words = document.getElementsByClassName('word');
    var green = {}
    var grey = []
    var yellow = {}

    Array(words.length).fill(0).forEach((_, i) => {
      const letters = words[i].getElementsByClassName('letter');
      Array(letters.length).fill(0).forEach((_, j) => {
        const elem = letters[j];
        if(elem.style.backgroundColor !== '' && elem.value !== ''){
          if(elem.style.backgroundColor === this.greenBack){
            green[j.toString()] = elem.value;
          }
          else if(elem.style.backgroundColor === this.greyBack){
            grey.push(elem.value);
          }
          else if(elem.style.backgroundColor === this.yellowBack){
            if(yellow[j.toString()] !== undefined){
              yellow[j.toString()] = yellow[j.toString()] + elem.value;
            }
            else{
              yellow[j.toString()] = elem.value;
            }
          }
        }
      });
    });

    var self = this;

    axios.post('https://n9gcmlsaug.execute-api.us-east-2.amazonaws.com/prod/get_words', {
        'correct': green,
        'absent': grey,
        'incorrectPosition': yellow
    })
    .then(function(response) {
      self.setState({
        candidates: response['data']['candidates']
      })
    })
  }

  handleClear() {
    var letters = document.getElementsByClassName('letter');

    Array(letters.length).fill(0).forEach((_, i) => {
      var elem = letters[i]
      elem.value = '';
      elem.style.backgroundColor = '';
      elem.style.color = 'rgb(0, 0, 0)';
    })
  }

  render(){
    return (
      <div className="App">
        <h1>Wordle Helper</h1>
        <div>Click each square to align the colors with your puzzle results</div>
        <div>This view should reflect exactly what your puzzle is showing</div>
        <br></br>
        <form>
          <WordList />
          <input type="button" className="submitBtn" value="Submit" onClick={this.handleSubmit}/>
          <input type="button" className="clearBtn" value="Clear" onClick={this.handleClear}/>
        </form>
        <h1>Word Suggestions</h1>
        <ul className="candidateList"><CandidateList candidates={this.state.candidates} /></ul>
      </div>
    );
  }
}

export default App;
