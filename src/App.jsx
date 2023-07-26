import './App.css'
import { useState, useEffect } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from "./components/InfoModule"
import { DifficultyModule } from './components/DifficultyModule'
import { recursiveCascadeCheck, checkOtherCellsToWin, generateBoard, generateMatrixWithContent, showAllMines, stopContextMenu, winnerToClassHelper } from './logic/app'
import { cloneBoard } from './logic/board'

import { DebugModule } from './components/DebugModule'
import { DIMENSIONS, WINNER_STATUS, DIFFICULTY_FLAGS } from './logic/constants.js'

function App() {

    const [winner, setWinner] = useState(WINNER_STATUS.no_winner)
    const [flags, setFlags] = useState(DIFFICULTY_FLAGS.easy)
    const [dimensions, setDimensions] = useState(DIMENSIONS.easy)
    const [finishedGame, setFinishedGame] = useState(false)
    const [board, setBoard] = useState(generateBoard(dimensions, dimensions))
    const [flagsBoard, setFlagsBoard] = useState(generateMatrixWithContent(dimensions, '.'))
    const [visibleBoard, setVisibleBoard] = useState(generateMatrixWithContent(dimensions, false))
    const [disableBoard, setDisableBoard] = useState(generateMatrixWithContent(dimensions, false))
    const [seconds, setSeconds] = useState(0);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [DEBUGshowGuide, setDEBUGshowGuide] = useState(false)

    const secondsCounter = () => {
        let currentSec = seconds + 1
        setSeconds(currentSec);
    }

    const changeDifficultyToEasy = () => {
        setDimensions(DIMENSIONS.easy)
    }

    const changeDifficultyToNormal = () => {
        setDimensions(DIMENSIONS.normal)
    }

    const changeDifficultyToHard = () => {
        setDimensions(DIMENSIONS.hard)
    }

    const resetBoard = () => {
        setWinner(WINNER_STATUS.no_winner)
        setSeconds(0)
        setFinishedGame(false)
        setGameInProgress(false)
        setBoard(generateBoard(dimensions, dimensions))

        let resetedBoard = generateMatrixWithContent(dimensions, false)
        setVisibleBoard(resetedBoard)
        setDisableBoard(resetedBoard)
        setFlagsBoard(generateMatrixWithContent(dimensions, '.'))
    }

    useEffect(() => {
        //Executes everytime the dimensions (difficulty) changes
        resetBoardAndFlags()
    }, [dimensions])
    
    const resetBoardAndFlags = () => {
        switch (dimensions) {
            case DIMENSIONS.easy:
                setFlags(DIFFICULTY_FLAGS.easy)
                break;
            case DIMENSIONS.normal:
                setFlags(DIFFICULTY_FLAGS.normal)
                break;
            case DIMENSIONS.hard:
                setFlags(DIFFICULTY_FLAGS.hard)
                break;
            default:
                alert("DIFFICULTY ERROR");
                break;
        }
        resetBoard()
    }

    const removeFlagFromBoard = (row, column) => {
        setFlags(flags + 1)
        updateFlagsBoardPositionWithValue(row, column, '.')
    }

    const placeFlagOnBoard = (row, column) => {
        setFlags(flags - 1)
        updateFlagsBoardPositionWithValue(row, column, '!')
    }

    const updateFlagsBoardPositionWithValue = (row, column, value) => {
        let newBoard = cloneBoard(flagsBoard)
        newBoard[row][column] = value
        setFlagsBoard(newBoard)
    }

    const startGame = () => {
        setGameInProgress(true)
    }

    const winGame = () => {
        setWinner(WINNER_STATUS.win)
        setFinishedGame(true)
        setGameInProgress(false)
    }

    const lostGame = () => {
        setWinner(WINNER_STATUS.lose)
        setFinishedGame(true)
        setGameInProgress(false)

        let losedBoard = showAllMines(visibleBoard, board)
        setVisibleAndDisableBoardTo(losedBoard)
    }

    const setVisibleAndDisableBoardTo = (boardToCopy) => {
        setVisibleBoard(boardToCopy)
        setDisableBoard(boardToCopy)
    }

    const cascadeStart = (row, col) => {
        let newVisibleBoard = cloneBoard(visibleBoard)
        let isClickedFlagged = (flagsBoard[row][col] === '!')

        recursiveCascadeCheck(newVisibleBoard, board, flagsBoard, dimensions, dimensions, row, col, isClickedFlagged)
        setVisibleAndDisableBoardTo(newVisibleBoard)
        checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
    }

    const updateVisibleBoard = (row, col) => {
        let newVisibleBoard = cloneBoard(visibleBoard)

        newVisibleBoard[row][col] = true
        setVisibleAndDisableBoardTo(newVisibleBoard)
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

            <InfoModule flags={flags} faceSource={winner} restartGame={resetBoardAndFlags} seconds={seconds} counter={secondsCounter}
                gameInProgress={gameInProgress} ></InfoModule>

            <BoardModule dimensions={dimensions} oldBoard={board} visibleBoard={visibleBoard} updateVisibleBoard={updateVisibleBoard} cascade={cascadeStart}
                looseGame={lostGame} removeFlagFromBoard={removeFlagFromBoard} placeFlagOnBoard={placeFlagOnBoard} flagsRemaining={flags} disableStatus={disableBoard}
                finishedGame={finishedGame} DEBUGshowGuide={DEBUGshowGuide} startGame={startGame} ></BoardModule>

            <DifficultyModule easyFunction={changeDifficultyToEasy} normalFunction={changeDifficultyToNormal} hardFunction={changeDifficultyToHard}></DifficultyModule>

        </div>
    )
}

export default App
