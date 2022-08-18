import React, { useState, useRef, useEffect } from 'react'
import './GameScreen.css'

const GameScreen = ({ verifyLetter, setScore, startGame, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, endGame, resetLetters, setGuesses }) => {

  const [letter, setLetter] = useState('');

  const letterInputRef = useRef(null);

  useEffect(() => {
    if(guesses <= 0 ){
      setGuesses(3);
      resetLetters();
      endGame();
    }
    },[guesses,endGame,resetLetters,setGuesses]
  )
  useEffect(()=> {
    const uniqueLetters = [...new Set(letters)];
    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100);
      resetLetters()
      startGame();
    }
   
  },[guessedLetters,resetLetters,startGame,letters,setScore]);

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };
  

  return (
    <div>
      <h1>Advinhe a palavra.</h1>
      <div className='pointsContainer'>
        <p>Pontuação: <span>{score}</span></p>
      </div>
      <h3 className='tip'>
        Dica sobre a palavra<span> {pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className='wordContainer'>
        {letters.map((l, i) => (
          guessedLetters.includes(l) ? (
            <span key={i} className='letter'>{l}</span>
          ) : (
            <span key={i} className='blankSquare'></span>
          )
        ))}
      </div>
      <div className='letterContainer'>
        <p>Tente advinhar a letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type='text'
            name='letter'
            maxLength="1"
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
            required></input>
          <button>Confirmar!</button>
        </form>
      </div>
      <div className='worngLetterContainer'>
        <p>Letras já utilizadas: </p>
        {wrongLetters.map((l, i) => (
          <span key={i}>{l}, </span>
        ))}
      </div>

    </div>
  )
}

export default GameScreen