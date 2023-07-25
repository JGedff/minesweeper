import './App.css'
import { useState, useEffect } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from "./components/InfoModule"
import { DifficultyModule } from './components/DifficultyModule'
import { checkOtherCellsToWin, generateBoard } from './logic/app'

function App() {

  //  0 = No winner
  //  1 = Winner
  //  2 = Loosed
    const [winner, setWinner] = useState(0)
    const [flags, setFlags] = useState(10)
    const [dimensions, setDimensions] = useState(8)

    const chooseDificultyEasy = () => {
        setFlags(10)
        setDimensions(8)
        resetBoard()
    }

    const chooseDificultyNormal = () => {
        setFlags(50)
        setDimensions(16)
        resetBoard()
    }

    const chooseDificultyHard = () => {
        setFlags(100)
        setDimensions(22)
        resetBoard()
    }

    const resetBoard = () => {
        setBoard(generateBoard(flags, dimensions, dimensions))
        setWinner(0)
        setVisibleBoard(generateMatrix(dimensions, false))
    }

    const addAFlag = () => {
        setFlags(flags + 1)
    }

    const substractAFlag = () => {
        setFlags(flags - 1)
    }

    const [board, setBoard] = useState(() => {
        return generateBoard(flags, dimensions, dimensions)
    })

    const looseGame = () => {
        setWinner(2)
    }

    const winGame = () => {
        setWinner(1)
    }

    useEffect(() => {
        resetBoard()
    }, [dimensions])

    const generateMatrix = (dimensions, content) => {
        let newBoard = new Array(dimensions)
        for (let indexRow = 0; indexRow < dimensions; indexRow++) {
            newBoard[indexRow] = new Array(dimensions)
            for (let indexColumn = 0; indexColumn < dimensions; indexColumn++) {
                newBoard[indexRow][indexColumn] = content
            }
        }
        return newBoard
    }

    const [visibleBoard, setVisibleBoard] = useState(() => {
        const startingBoard = generateMatrix(dimensions, false)
        return startingBoard
    })

    const validPosition = (number1, number2) => {
        return (0 <= number1) && (number1 < dimensions) && (0 <= number2) && (number2 < dimensions)
    }

    const cascade = (row, col) => {
        let newVisibleBoard = [...visibleBoard]
        cascadeCheck(newVisibleBoard, row, col)
        setVisibleBoard(newVisibleBoard)
        checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
    }

    const cascadeCheck = (checkedMatrix, row, col) => {
        if (validPosition(row, col) && board[row][col] === 0 && checkedMatrix[row][col] !== true) {
            checkedMatrix[row][col] = true
            cascadeCheck(checkedMatrix, row + 1, col)
            cascadeCheck(checkedMatrix, row + 1, col + 1)
            cascadeCheck(checkedMatrix, row - 1, col)
            cascadeCheck(checkedMatrix, row - 1, col - 1)
            cascadeCheck(checkedMatrix, row, col + 1)
            cascadeCheck(checkedMatrix, row - 1, col + 1)
            cascadeCheck(checkedMatrix, row, col - 1)
            cascadeCheck(checkedMatrix, row + 1, col - 1)
        } else if (validPosition(row, col) && checkedMatrix[row][col] !== true) {
            checkedMatrix[row][col] = true
        }
    }

    const updateVisibleBoard = (row, col) => {
        let newVisibleBoard = [...visibleBoard]
        newVisibleBoard[row][col] = true
        setVisibleBoard(newVisibleBoard)
        checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
    }

    return (
        <div>
            <InfoModule flags={flags} faceSource={winner} restartGame={resetBoard}></InfoModule>

            <BoardModule dimensions={dimensions} oldBoard={board} visibleBoard={visibleBoard} updateVisibleBoard={updateVisibleBoard} cascade={cascade} winGame={winGame} looseGame={looseGame}
                addAFlag={addAFlag} substractAFlag={substractAFlag} flagsRemaining={flags}
            ></BoardModule>

            <DifficultyModule easyFunction={chooseDificultyEasy} normalFunction={chooseDificultyNormal} hardFunction={chooseDificultyHard}></DifficultyModule>
        </div>
    )
}

export default App
