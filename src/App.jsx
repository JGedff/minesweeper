import './App.css'
import { useState, useEffect } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from "./components/InfoModule"
import { DifficultyModule } from './components/DifficultyModule'
import { cascadeCheck, checkOtherCellsToWin, generateBoard, generateMatrixWithContent, showAllMines, stopContextMenu, validPosition, winnerToClassHelper } from './logic/app'
import { DebugModule } from './components/DebugModule'
import { cloneBoard } from './logic/board'

function App() {

    const [winner, setWinner] = useState(0)
    const [flags, setFlags] = useState(10)
    const [dimensions, setDimensions] = useState(8)
    const [finishedGame, setFinishedGame] = useState(false)
    const [board, setBoard] = useState(generateBoard(dimensions, dimensions))
    const [flagsBoard, setFlagsBoard] = useState(generateMatrixWithContent(dimensions, '.'))
    const [visibleBoard, setVisibleBoard] = useState(generateMatrixWithContent(dimensions, false))
    const [disableBoard, setDisableBoard] = useState(generateMatrixWithContent(dimensions, false))
    const [seconds, setSeconds] = useState(0);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [DEBUGshowGuide, setDEBUGshowGuide] = useState(false)

    useEffect(() => {
        resetBoardAndFlags()
    }, [dimensions])

    const counter = () => {
        let currentSec = seconds + 1
        setSeconds(currentSec);
    }

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
        setWinner(0)
        setSeconds(0)
        setFinishedGame(false)
        setGameInProgress(false)
        setBoard(generateBoard(dimensions, dimensions))

        let resetedBoard = generateMatrixWithContent(dimensions, false)
        setVisibleBoard(resetedBoard)
        setDisableBoard(resetedBoard)
        setFlagsBoard(generateMatrixWithContent(dimensions, '.'))
    }

    const resetBoardAndFlags = () => {
        switch (dimensions) {
            case 8:
                setFlags(10)
                break;
            case 16:
                setFlags(50)
                break;
            default:
                setFlags(100)
                break;
        }
        
        resetBoard()
    }

    const addAFlag = (row, column) => {
        setFlags(flags + 1)

        let newBoard = cloneBoard(flagsBoard)
        
        newBoard[row][column] = '.'
            
        setFlagsBoard(newBoard)
    }

    const substractAFlag = (row, column) => {
        setFlags(flags - 1)

        let newBoard = cloneBoard(flagsBoard)

        newBoard[row][column] = '!'
            
        setFlagsBoard(newBoard)
    }

    const looseGame = () => {
        setWinner(2)
        setFinishedGame(true)

        let losedBoard = showAllMines(visibleBoard, board)
        setVisibleBoard(losedBoard)
        setDisableBoard(losedBoard)
        setGameInProgress(false)
    }

    const winGame = () => {
        setWinner(1)
        setFinishedGame(true)
        setGameInProgress(false)
    }

    const startGame = () => {
        setGameInProgress(true)
    }

    const cascade = (row, col) => {
        let newVisibleBoard = cloneBoard(visibleBoard)
        let isClickedFlagged = (flagsBoard[row][col] === '!')
        cascadeCheck(newVisibleBoard, board, flagsBoard, dimensions, dimensions, row, col, isClickedFlagged)
        setVisibleBoard(newVisibleBoard)
        setDisableBoard(newVisibleBoard)
        checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
    }

    const updateVisibleBoard = (row, col) => {
        let newVisibleBoard = cloneBoard(visibleBoard)
        newVisibleBoard[row][col] = true
        setVisibleBoard(newVisibleBoard)
        setDisableBoard(newVisibleBoard)
        checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
    }

    const debugMode = e => {
        if (e.code === 'KeyS') {
            setDEBUGshowGuide(!DEBUGshowGuide)
        } else if (e.code === 'KeyM' && e.ctrlKey === true) {
            alert('Aún no esta implementado el Mock Load. ¡Pero lo estará!\nToma un gato de mientras:\n                🐈')
        }
    }

    return (
        <div className={'container' + winnerToClassHelper(winner)} onContextMenu={stopContextMenu}>
            
            <DebugModule debugFunction={debugMode}></DebugModule>

            <InfoModule flags={flags} faceSource={winner} restartGame={resetBoardAndFlags} seconds={seconds} counter={counter}
                gameInProgress={gameInProgress} ></InfoModule>

            <BoardModule dimensions={dimensions} oldBoard={board} visibleBoard={visibleBoard} updateVisibleBoard={updateVisibleBoard} cascade={cascade}
                looseGame={looseGame} addAFlag={addAFlag} substractAFlag={substractAFlag} flagsRemaining={flags} disableStatus={disableBoard}
                finishedGame={finishedGame} DEBUGshowGuide={DEBUGshowGuide} startGame={startGame} ></BoardModule>

            <DifficultyModule easyFunction={chooseDificultyEasy} normalFunction={chooseDificultyNormal} hardFunction={chooseDificultyHard}></DifficultyModule>
        </div>
    )
}

export default App
