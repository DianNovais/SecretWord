import './App.css';


//data
import { wordsList } from './data/words';

//components
import StartScreen from './components/StartScreen'
import { useState, useCallback } from 'react';
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'

const stage = [
  {
    id:1, name:'start',
  },{
    id:2, name:'game',
  },{
    id:3, name:'end',
  },
];



function App() {
  const [page,setPage] = useState(stage[0].name);
  const [words] = useState(wordsList)

  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory,setPickedCategory] = useState('');
  const [letters,setLetters] = useState([]);



  const [guessedLetters,setGuessedLetters] = useState([]);
  const [wrongLetters,setWrongLetters] = useState([]);
  const [guesses,setGuesses] = useState(3);
  const [score,setScore] = useState(0);

  // process letter input
  const verifyLetter = (letter) => {
    
    const normalizedLetter = letter.toLowerCase();
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }


    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => guesses - 1);
    }
  };

  const pickCategoryAndWord =useCallback( () => {
    // pick random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * (categories).length)];

    //pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
  

    return {category,word};
  },[words]);


  const resetLetters = useCallback( () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  },[setGuessedLetters]);
  //start the game
  const startGame =useCallback( () => {
    
    const {category, word} = pickCategoryAndWord();

    //separando as letras da palavra
    let wordLetters = word.split('');
    //deixando todas letras minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //set states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    

    setPage(stage[1].name);
  },[pickCategoryAndWord]);
  //The end
  const endGame = () => setPage(stage[2].name);

  //retry Game
  const retryGame = () => {
    setScore(0);
    setPage(stage[0].name);
    
  }



  return (
    <div className="App">
      {page === 'start' ? <StartScreen startGame={startGame}/> : ('')}
      {page === 'game' ? <GameScreen verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} endGame={endGame} resetLetters={resetLetters} setGuesses={setGuesses} setScore={setScore} startGame={startGame}/> : ('')}
      {page === 'end' ? <EndScreen retryGame={retryGame} score={score}/> : ('')}
      <footer className='footerContainer'>Copyright© 2022 Estudos Dian Novais - Todos direitos Reservados.</footer>
    </div>
  );
}

export default App;
