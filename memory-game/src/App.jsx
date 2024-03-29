import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]  // duplicate each of the cards once for matching
      // returns either -ve or +ve number randomly
      .sort(() => Math.random() - 0.5)  // if returns -ve num then compared items order remains same else order swaps
      .map((card) => ({ ...card, id: Math.random() }))  // add any random id property on each of the cards

      // just incase if choiceOne & choiceTwo had selected value
      setChoiceOne(null)
      setChoiceTwo(null)

      setCards(shuffledCards)  // update the cards state
      setTurns(0)  // reset the turns state to 0
  }

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }      
    }
  }, [choiceOne, choiceTwo])

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  // handle a choice
  function handleChoice(card) {
    // Stop user from being able to click first card twice
    if(card.id === choiceTwo?.id) return;

    // these states updates are scheduled & not update on instant
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  return (
    <div className="App">
      <h1>Card Match</h1>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={ handleChoice }
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
