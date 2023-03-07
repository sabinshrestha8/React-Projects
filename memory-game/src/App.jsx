import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]  // duplicate each of the cards once for matching
      // returns either -ve or +ve number randomly
      .sort(() => Math.random() - 0.5)  // if returns -ve num then compared items order remains same else order swaps
      .map((card) => ({ ...card, id: Math.random }))  // add any random id property on each of the cards

      setCards(shuffledCards)  // update the cards state
      setTurns(0)  // reset the turns state to 0
  }

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Card Match</h1>
      <button onClick={ shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard card={card} key={card.id} />
        ))}
      </div>
    </div>
  )
}

export default App
