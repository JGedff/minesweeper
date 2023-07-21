import './App.css'
import { useState } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from "./components/InfoModule"

function App() {

  // 0 = No winner
  //1 = Winner
  //2 = Loosed
  let winner = 0
  let [flags, setFlags] = useState(10)
  let [dimensions, setDimensions] = useState(8)
  
  const chooseDificultyEasy = () => {
    setFlags(10)
    setDimensions(8)
  }

  const chooseDificultyNormal = () => {
    setFlags(50)
    setDimensions(16)
  }

  const chooseDificultyHard = () => {
    setFlags(100)
    setDimensions(22)
  }

  return (
    <>
      <InfoModule flags={flags} faceSource={winner}></InfoModule>

      <BoardModule dimensions={dimensions} flags={flags} ></BoardModule>

      <footer className="chooseDificulty">
          <button onClick={chooseDificultyEasy}> easy </button>
          <button onClick={chooseDificultyNormal}> normal </button>
          <button onClick={chooseDificultyHard}> hard </button>
      </footer>
    </>
  )
}

export default App
