import React, { useEffect, useState } from 'react'

import { CellModule } from './CellModule'
import { winnerToClassHelper } from '../logic/board'

export const BoardModule = ({
  updateBoard, rectangleWidth, oldBoard, coverStatusBoard, updateCoverStatusBoard, cascade, looseGame, placeFlagOnBoard,
  removeFlagFromBoard, flagsRemaining, finishedGame, DEBUGshowGuide, startGame, winnerStatus
}) => {
  const [restartGame, setRestartGame] = useState(false)
  const [boardDimensions, setBoardDimensions] = useState(rectangleWidth)
  const [initialBoardDimensions, setInitialBoardDimensions] = useState(rectangleWidth)

  useEffect(() => {
    setRestartGame(!restartGame)
  }, [oldBoard])

  useEffect(() => {
    if (rectangleWidth !== undefined) {
      setBoardDimensions(rectangleWidth)
    }
  }, [rectangleWidth])

  useEffect(() => {
    if (initialBoardDimensions !== undefined) {
      setBoardDimensions(initialBoardDimensions)
    }
    setInitialBoardDimensions(rectangleWidth)
  }, [updateBoard])

  return (
        <main className={'justify-center' + winnerToClassHelper(winnerStatus)} data-testid='main' >

            <section className="game" data-testid="gameBoard" style={{
              gridTemplateColumns: `repeat(${boardDimensions}, 1fr)`
            }}>
                {
                oldBoard.map((row, indexRow) => {
                  return (
                    row.map((cell, indexColumn) => {
                      return (
                                <CellModule
                                key={indexColumn}
                                row={indexRow}
                                column={indexColumn}
                                restartGame={restartGame}
                                looseGame={looseGame}
                                uncoverNumber={updateCoverStatusBoard}
                                cascade={cascade}
                                initialUncover={coverStatusBoard[indexRow][indexColumn]}
                                removeFlagFromBoard={removeFlagFromBoard}
                                placeFlagOnBoard={placeFlagOnBoard}
                                flagsRemaining={flagsRemaining}
                                finishedGame={finishedGame}
                                DEBUGshowGuide={DEBUGshowGuide}
                                startGame={startGame} >
                                    {cell}
                                </CellModule>
                      )
                    })
                  )
                })}
            </section>

        </main>
  )
}
