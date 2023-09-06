import './App.css'
import React, { useState, useEffect } from 'react'

import { BoardModule } from './components/BoardModule'
import { InfoModule } from './components/InfoModule'
import { ModesModule } from './components/ModesModule'
import { recursiveCascadeCheck, checkOtherCellsToWin, generateBoard, showAllMines, stopContextMenu, setupDangerCells } from './logic/app'
import { cloneBoard, generateEmptyBoardWith2Dimensions, generate2DMatrixWithContent } from './logic/board'

import { DebugModule } from './components/DebugModule'
import { DIMENSIONS, WINNER_STATUS, DIFFICULTY_FLAGS } from './logic/constants.js'

// GET COUNTRY NUMBER CODES: https://restcountries.com/v3.1/all?fields=ccn3
// GET RANDOM COUNTRYCODE
// GET COUNTRY CAPITAL: https://restcountries.com/v3.1/alpha/${COUNTRYCODE}?fields=capital

function App () {
  /* API CONNECTION */

  const [capital, setCapital] = useState()
  const [background, setBackground] = useState()

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=ccn3')
      .then(res => res.json())
      .then((res) => {
        const numberOfObjects = res.length
        const indexRandomObject = Math.trunc(Math.random() * numberOfObjects)
        const countryObject = res[indexRandomObject]
        const codeNumber = Number(countryObject.ccn3)

        fetch(`https://restcountries.com/v3.1/alpha/${codeNumber}?fields=capital`)
          .then(res => res.json())
          .then((res) => {
            const capitalName = res.capital

            fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=${capitalName}&format=json&prop=images`)
              .then(res => res.json())
              .then((data) => {
                const Files = (Object.values(data.query.pages)[0]).images

                for (let counter = 0; counter < Files.length; counter++) {
                  if (objectIsImage(Files[counter].title)) {
                    const dist = Files[counter].title.split(':')
                    const aux = dist[1]
                    console.log(aux)
                    setBackground(aux)
                    setCapital(capitalName)
                    break
                  }
                }
              })
          })
      })
  }, [])

  const objectIsImage = (title) => {
    return (title.endsWith('.png') || title.endsWith('.jpg'))
  }

  /* MINESWEEPER */
  const [seconds, setSeconds] = useState(0)
  const [finishedGame, setFinishedGame] = useState(false)
  const [flags, setFlags] = useState(DIFFICULTY_FLAGS.easy)
  const [gameInProgress, setGameInProgress] = useState(false)
  const [DEBUGshowGuide, setDEBUGshowGuide] = useState(false)
  const [winner, setWinner] = useState(WINNER_STATUS.no_winner)
  const [dimensions, setDimensions] = useState(DIMENSIONS.easy)
  const [rectangleWidth, setRectangleWidth] = useState(undefined)
  const [board, setBoard] = useState(generateBoard(dimensions, dimensions))
  const [flagsBoard, setFlagsBoard] = useState(generate2DMatrixWithContent(dimensions, dimensions, '.'))
  const [coverStatusBoard, setCoverStatusBoard] = useState(generate2DMatrixWithContent(dimensions, dimensions, false))

  const secondsCounter = () => {
    const currentSec = seconds + 1
    setSeconds(currentSec)
  }

  const changeGamemode = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        setDimensions(DIMENSIONS.easy)
        resetBoardAndFlags()
        break
      case 'normal':
        setDimensions(DIMENSIONS.normal)
        resetBoardAndFlags()
        break
      case 'hard':
        setDimensions(DIMENSIONS.hard)
        resetBoardAndFlags()
        break
      default:
        debugMode()
        break
    }
    setRectangleWidth(undefined)
  }

  const resetBoard = () => {
    setWinner(WINNER_STATUS.no_winner)
    setSeconds(0)
    setFinishedGame(false)
    setGameInProgress(false)
    setBoard(generateBoard(dimensions, dimensions))
    setFlagsBoard(generate2DMatrixWithContent(dimensions, dimensions, '.'))
    setRectangleWidth(undefined)

    const resetedBoard = generate2DMatrixWithContent(dimensions, dimensions, false)
    setCoverStatusBoard(resetedBoard)
  }

  useEffect(() => {
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

    const losedBoard = showAllMines(coverStatusBoard, board)
    setCoverStatusBoard(losedBoard)
  }

  const cascadeStart = (row, col) => {
    const newCoverStatusBoard = cloneBoard(coverStatusBoard)
    const isClickedFlagged = (flagsBoard[row][col] === '!')

    const heightBoard = flagsBoard.length
    const widthBoard = flagsBoard[0].length

    recursiveCascadeCheck(newCoverStatusBoard, board, flagsBoard, heightBoard, widthBoard, row, col, isClickedFlagged)
    setCoverStatusBoard(newCoverStatusBoard)
    checkOtherCellsToWin(newCoverStatusBoard, board, row, col, winGame)
  }

  const updateCoverStatusBoard = (row, col) => {
    const newCoverStatusBoard = cloneBoard(coverStatusBoard)

    newCoverStatusBoard[row][col] = true
    setCoverStatusBoard(newCoverStatusBoard)
    checkOtherCellsToWin(newCoverStatusBoard, board, row, col, winGame)
  }

  const debugMode = () => {
    setDEBUGshowGuide(!DEBUGshowGuide)
  }

  const DEBUGloadMockData = (mockdata) => {
    const mockDataSanitized = mockdata.replaceAll('"', '').replaceAll('\\n', '\n').trim()
    const rows = mockDataSanitized.split('\n')
    const width = rows[0].replaceAll(' ', '').split('|').length - 2
    const height = rows.length
    let numberOfMines = 0

    const mockBoard = generateEmptyBoardWith2Dimensions(height, width)

    const mockDataInline = mockDataSanitized.replaceAll(' ', '').replaceAll('|', '').replaceAll('\n', '')

    let mockdataCounter = 0
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (mockDataInline.charAt(mockdataCounter) === '*') {
          mockBoard[row][col] = '@'
          numberOfMines++
        } else {
          mockBoard[row][col] = '0'
        }
        mockdataCounter++
      }
    }

    const mockBoardDangerCells = setupDangerCells(mockBoard, height, width)
    setFlagsBoard(generate2DMatrixWithContent(height, width, '.'))
    setFlags(numberOfMines)
    setRectangleWidth(width)
    setBoard(mockBoardDangerCells)
  }

  const getGamemodeClass = (dimensions) => {
    switch (dimensions) {
      case DIMENSIONS.easy:
        return 'easy:justify-center'
      case DIMENSIONS.normal:
        return 'normal:justify-center'
      case DIMENSIONS.hard:
        return 'hard:justify-center'
    }
  }

  console.log('Welcome to MinesweepeReact!')

  return (
    <>
      <div id='APIbg' className='w-full h-[inherit] absolute -z-10 bg-cover flex justify-end items-end text-xl text-shadow font-raleway font-bold pr-8' style={{ backgroundImage: background ? 'url(https://commons.wikimedia.org/wiki/Special:FilePath/' + background + ')' : '' }}>
        {capital}
      </div>
      <div id='main' className='m-0'>

        {DEBUGshowGuide && <DebugModule getMockData={DEBUGloadMockData} />}

        <div data-testid='container' onContextMenu={stopContextMenu}>

          <InfoModule flags={flags} faceSource={winner} restartGame={resetBoardAndFlags} seconds={seconds} counter={secondsCounter}
            gameInProgress={gameInProgress} ></InfoModule>

          <div className={'flex justify-start w-full mt-8 ' + getGamemodeClass(dimensions)}>
            <BoardModule dimensions={dimensions} rectangleWidth={rectangleWidth} oldBoard={board} coverStatusBoard={coverStatusBoard} updateCoverStatusBoard={updateCoverStatusBoard} cascade={cascadeStart}
              looseGame={lostGame} removeFlagFromBoard={removeFlagFromBoard} placeFlagOnBoard={placeFlagOnBoard} flagsRemaining={flags}
              finishedGame={finishedGame} DEBUGshowGuide={DEBUGshowGuide} startGame={startGame} winnerStatus={winner} ></BoardModule>
          </div>

          <ModesModule changeGamemode={changeGamemode}></ModesModule>

        </div>
      </div>
    </>

  )
}

export default App
