import './App.css'
import React, { useState, useEffect } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from './components/InfoModule'
import { DifficultyModule } from './components/DifficultyModule'
import { recursiveCascadeCheck, checkOtherCellsToWin, generateBoard, generateMatrixWithContent, showAllMines, stopContextMenu, winnerToClassHelper, setupDangerCells } from './logic/app'
import { cloneBoard, generateEmptyBoardWith2Dimensions } from './logic/board'

import { DebugModule } from './components/DebugModule'
import { DIMENSIONS, WINNER_STATUS, DIFFICULTY_FLAGS } from './logic/constants.js'

function App () {
  const [seconds, setSeconds] = useState(0)
  const [finishedGame, setFinishedGame] = useState(false)
  const [flags, setFlags] = useState(DIFFICULTY_FLAGS.easy)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [DEBUGshowGuide, setDEBUGshowGuide] = useState(false)
  const [winner, setWinner] = useState(WINNER_STATUS.no_winner)
  const [dimensions, setDimensions] = useState(DIMENSIONS.easy)
  const [rectangleWidth, setRectangleWidth] = useState(undefined)
  const [board, setBoard] = useState(generateBoard(dimensions, dimensions))
  const [flagsBoard, setFlagsBoard] = useState(generateMatrixWithContent(dimensions, '.'))
  const [visibleBoard, setVisibleBoard] = useState(generateMatrixWithContent(dimensions, false))
  const [disableBoard, setDisableBoard] = useState(generateMatrixWithContent(dimensions, false))

  const secondsCounter = () => {
    const currentSec = seconds + 1
    setSeconds(currentSec)
  }

  const changeDifficultyToEasy = () => {
    setDimensions(DIMENSIONS.easy)
    setRectangleWidth(undefined)
  }

  const changeDifficultyToNormal = () => {
    setDimensions(DIMENSIONS.normal)
    setRectangleWidth(undefined)
  }

  const changeDifficultyToHard = () => {
    setDimensions(DIMENSIONS.hard)
    setRectangleWidth(undefined)
  }

  const resetBoard = () => {
    setWinner(WINNER_STATUS.no_winner)
    setSeconds(0)
    setFinishedGame(false)
    setGameInProgress(false)
    setBoard(generateBoard(dimensions, dimensions))
    setFlagsBoard(generateMatrixWithContent(dimensions, '.'))
    setRectangleWidth(undefined)

    const resetedBoard = generateMatrixWithContent(dimensions, false)
    setVisibleBoard(resetedBoard)
    setDisableBoard(resetedBoard)
  }

  useEffect(() => {
    // Executes everytime the dimensions (difficulty) changes
    resetBoardAndFlags()
  }, [dimensions])

  const resetBoardAndFlags = () => {
    switch (dimensions) {
      case DIMENSIONS.easy:
        setFlags(DIFFICULTY_FLAGS.easy)
        break
      case DIMENSIONS.normal:
        setFlags(DIFFICULTY_FLAGS.normal)
        break
      case DIMENSIONS.hard:
        setFlags(DIFFICULTY_FLAGS.hard)
        break
      default:
        alert('DIFFICULTY ERROR')
        break
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
    const newBoard = cloneBoard(flagsBoard)
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

    const losedBoard = showAllMines(visibleBoard, board)
    setVisibleAndDisableBoardTo(losedBoard)
  }

  const setVisibleAndDisableBoardTo = (boardToCopy) => {
    setVisibleBoard(boardToCopy)
    setDisableBoard(boardToCopy)
  }

  const cascadeStart = (row, col) => {
    const newVisibleBoard = cloneBoard(visibleBoard)
    const isClickedFlagged = (flagsBoard[row][col] === '!')

    recursiveCascadeCheck(newVisibleBoard, board, flagsBoard, dimensions, dimensions, row, col, isClickedFlagged)
    setVisibleAndDisableBoardTo(newVisibleBoard)
    checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
  }

  const updateVisibleBoard = (row, col) => {
    const newVisibleBoard = cloneBoard(visibleBoard)

    newVisibleBoard[row][col] = true
    setVisibleAndDisableBoardTo(newVisibleBoard)
    checkOtherCellsToWin(newVisibleBoard, board, row, col, winGame)
  }

  const debugMode = e => {
    if (e.code === 'KeyS') {
      setDEBUGshowGuide(!DEBUGshowGuide)
    } else if (e.code === 'KeyM' && e.ctrlKey === true) {
      const mockData = prompt('Welcome to the Mock Data Debug prompt!\nInput your line mock data here:')
      if (mockData !== null) {
        DEBUGloadMockData(mockData)
      }
    }
  }

  const DEBUGloadMockData = (mockdata = '') => {
    resetBoard()

    const rows = mockdata.split('\r\n')
    const width = rows[0].replaceAll(' ', '').split('|').length - 2
    const height = rows.length
    let numberOfMines = 0

    const mockBoard = generateEmptyBoardWith2Dimensions(height, width)

    const mockDataSanitized = mockdata.replaceAll(' ', '').replaceAll('|', '').replaceAll('\r\n', '')

    let mockdataCounter = 0
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (mockDataSanitized.charAt(mockdataCounter) === '*') {
          mockBoard[row][col] = '@'
          numberOfMines++
        } else {
          mockBoard[row][col] = '0'
        }
        mockdataCounter++
      }
    }

    const mockBoardDangerCells = setupDangerCells(mockBoard, height, width)
    setFlags(numberOfMines)
    setRectangleWidth(width)
    setBoard(mockBoardDangerCells)
  }

  return (
        <div className={'container' + winnerToClassHelper(winner)} data-testid='container' onContextMenu={stopContextMenu}>

            <DebugModule debugFunction={debugMode}></DebugModule>

            <InfoModule flags={flags} faceSource={winner} restartGame={resetBoardAndFlags} seconds={seconds} counter={secondsCounter}
                gameInProgress={gameInProgress} ></InfoModule>

            <BoardModule dimensions={dimensions} rectangleWidth={rectangleWidth} oldBoard={board} visibleBoard={visibleBoard} updateVisibleBoard={updateVisibleBoard} cascade={cascadeStart}
                looseGame={lostGame} removeFlagFromBoard={removeFlagFromBoard} placeFlagOnBoard={placeFlagOnBoard} flagsRemaining={flags} disableStatus={disableBoard}
                finishedGame={finishedGame} DEBUGshowGuide={DEBUGshowGuide} startGame={startGame} ></BoardModule>

            <DifficultyModule easyFunction={changeDifficultyToEasy} normalFunction={changeDifficultyToNormal} hardFunction={changeDifficultyToHard}></DifficultyModule>

        </div>
  )
}

export default App
