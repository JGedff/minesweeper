import './App.css'
import { useState, useEffect } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from "./components/InfoModule"
import { DifficultyModule } from './components/DifficultyModule'

/*
Cosas por hacer:

  Crar script alterno para poner funciones

*/

function App() {

  // 0 = No winner
  //1 = Winner
  //2 = Loosed
    let winner = 0
    const [flags, setFlags] = useState(10)
    const [dimensions, setDimensions] = useState(8)

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

    const resetBoard = () => {
        setBoard(generateBoard())
    }

    const [board, setBoard] = useState(() => {
        let newBoard = new Array(length)

        for (let x = 0; x < dimensions; x++) {
            newBoard[x] = new Array(length)
        }

        return newBoard
    })

    const generateEmptyBoardWith2Dimensions = (heigh, length) => {
        let newBoard = new Array(heigh)

        for (let x = 0; x < heigh; x++) {
            newBoard[x] = new Array(length)
        }

        return newBoard
    }

    const generateMines = () => {
        let row = 0
        let col = 0
        let mines = flags
        let newBoard = generateEmptyBoardWith2Dimensions(dimensions, dimensions)

        while (mines > 0) {
            
            row = Math.trunc(Math.random() * dimensions)
            col = Math.trunc(Math.random() * dimensions)
            
            if (newBoard[row][col] == 0 || newBoard[row][col] == undefined) {
                newBoard[row][col] = '💣'

                mines--
            }
        }

        for (let x = 0; x < newBoard.length; x++) {
            for (let y = 0; y < newBoard[x].length; y++) {
                if (newBoard[x][y] != '💣') {
                    newBoard[x][y] = 0
                }
            }
        }

        return newBoard
    }

    const numberAdjacentMines = (mineField, x, y, dim) => {
        let adjacentMines = 0

        for(let row = (x - 1); row < (x + 2); row++) {
            if (row >= 0 && row < dim) {
                for(let col = (y - 1); col < (y + 2); col++) {
                    if (col >= 0 && col < dim) {
                        if (mineField[row][col] == '💣') {
                            adjacentMines++
                        }
                    }
                }
            }
        }

        return adjacentMines
    }

    const setupDangerCells = (oldBoard) => {
        let newBoard = generateEmptyBoardWith2Dimensions(dimensions, dimensions)

        for (let x = 0; x < newBoard.length; x++) {
            for (let y = 0; y < newBoard[x].length; y++) {
                newBoard[x][y] = oldBoard[x][y]
            }
        }

        for (let x = 0; x < oldBoard.length; x++) {
            for (let y = 0; y < oldBoard[x].length; y++) {
                if (oldBoard[x][y] != '💣') {
                    let adjacentMines = numberAdjacentMines(oldBoard, x, y, dimensions)

                    newBoard[x][y] = adjacentMines
                }
            }
        }

        return newBoard
    }

    const generateBoard = () => {
        let newBoard = generateEmptyBoardWith2Dimensions(dimensions, dimensions)

        newBoard = generateMines()
        newBoard = setupDangerCells(newBoard)

        return newBoard
    }

    useEffect(() => {
        resetBoard()
    }, [dimensions])

    return (
        <>
            <InfoModule flags={flags} faceSource={winner} restartGame={resetBoard}></InfoModule>

            <BoardModule dimensions={dimensions} board={board} ></BoardModule>

            <DifficultyModule easyFunction={chooseDificultyEasy} normalFunction={chooseDificultyNormal} hardFunction={chooseDificultyHard}></DifficultyModule>
        </>
    )
}

export default App
