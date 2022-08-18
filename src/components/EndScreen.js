import React from 'react'
import './EndScreen.css';

const EndScreen = ({retryGame, score}) => {
  return (
    <div>
        <h1>Fim De Jogo!</h1>
        <p className='endPara'>Sua Pontuação foi :<span className='endScore'>{score}</span></p>
        <button onClick={retryGame}>Reiniciar o Jogo</button>
    </div>
  )
}

export default EndScreen