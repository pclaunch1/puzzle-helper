import Word from 'components/Word';

const wordCount = 6;

function WordList(props) {
  return (
    Array(wordCount).fill(0).map((_, i) => <div className="word" key={i}><Word wordLength={5} index={i}/></div>)
  );
}

export default WordList;
