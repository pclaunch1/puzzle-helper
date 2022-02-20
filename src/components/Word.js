import 'styles/Word.css'

function Word(props) {
  const greenBack = 'rgb(106, 170, 100)';
  const greyBack = 'rgb(120, 124, 126)';
  const yellowBack = 'rgb(202, 180, 88)';
  const whiteBack = '';
  const blackText = 'rgb(0, 0, 0)';
  const whiteText = 'rgb(255, 255, 255)';

  const changeTextBackground = (node) => {
    var letter = node.value;
    var id = node.id;
    var elem = document.getElementById(id)
    if(letter !== ""){
      var curColor = node.style.backgroundColor;
      if(curColor === whiteBack){
        elem.style.backgroundColor = greenBack;
        elem.style.color = whiteText;
      } else if(curColor === greenBack){
        elem.style.backgroundColor = yellowBack;
        elem.style.color = whiteText;
      } else if(curColor === yellowBack){
        elem.style.backgroundColor = greyBack;
        elem.style.color = whiteText;
      } else if(curColor === greyBack){
        elem.style.backgroundColor = whiteBack;
        elem.style.color = blackText;
        elem.style.textShadow = '';
      }
    }
  }

  const handleClick = (event) => {
    if(event.target.value !== ""){
      changeTextBackground(event.target)
    }
    else{
      event.target.style.backgroundColor = '';
      event.target.style.color = blackText;
    }
  }

  const handleKeyDown = (event) => {
    if(event.code.includes("Key")){
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      window.setTimeout(() => form.elements[index + 1].focus(), 0);
    }
    else if(event.key === 'Backspace'){
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      if(index > 0){
        form.elements[index - 1].value = '';
        window.setTimeout(() => form.elements[index - 1].focus(), 0);
      }
    }
    else{
      event.preventDefault();
    }
  }

  const wordLength = props.wordLength;

  return (
    Array(wordLength).fill(0).map((_, i) => <input className="letter" id={"letter-" + i.toString() + props.index.toString()} type="text" maxLength="1" onClick={handleClick} onKeyDown={handleKeyDown} key={i} />)
  );
}

export default Word;
