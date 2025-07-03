import { useState, useEffect, useRef, useId } from 'react'
import Die from './Die.jsx'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'


function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonFocus = useRef(null)

  // Variable to determine if game is won
  const gameWon = dice.every(die => die.isHeld) 
  && dice.every(die => die.value === dice[0].value)

  // Put focus on new game button for accessiblity
  useEffect(() => {
    gameWon ? buttonFocus.current.focus() : null
  }, [gameWon])

  // Generate initial and all new dice
  function generateAllNewDice() {
    let allDice = []
    
    for(let i = 0; i < 10; i++) {
      const randomNum = Math.ceil(Math.random() * 6)
      allDice.push({
        value: randomNum,
        isHeld: false, 
        id : nanoid()
      })
    }

    return allDice
  }
  
  // Hold Dice
  function holdDice(id) {
    setDice(die => die.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item
    }))
  }

  // Reroll dice
  function rollDice() {
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? {...die} : {...die, value:  Math.ceil(Math.random() * 6)}
    }))
  }

  // Creating each dice for Die component
  const diceButtons = dice.map(die => {
    return <Die value={die.value} key={die.id} id={die.id} isHeld={die.isHeld} holdDice={holdDice}/>
  })

  // Setting up a new game for user
  function newGame() {
    setDice(generateAllNewDice())
  }


  return (
    <main className="gameboard">
      {gameWon && <Confetti />}
      <div className="sr-only" aria-live='polite'>
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div className="content">
        <div className="game-info">
          <h1>Tenzies</h1>
          <p>
              Roll until all dice are the same. Click each die to freeze it at its current value between rolls.<br />
              <br/>When all the die are matching, you win!
          </p>
        </div>
        <div className="die-container">
          {diceButtons}
        </div>
        <button className='roll-dice' onClick={gameWon ? newGame : rollDice} ref={buttonFocus}>{gameWon ? "New Game" : "Roll"}</button>
      </div>
      
      </main>
  )
}

export default App
