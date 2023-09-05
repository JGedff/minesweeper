import React, { useEffect, useState } from 'react'

import { CellModule } from './CellModule'
import { winnerToClassHelper } from '../logic/board'

export const BoardModule = ({
  dimensions, rectangleWidth, oldBoard, coverStatusBoard, updateCoverStatusBoard, cascade, looseGame, placeFlagOnBoard,
  removeFlagFromBoard, flagsRemaining, finishedGame, DEBUGshowGuide, startGame, winnerStatus
}) => {
  const [restartGame, setRestartGame] = useState(false)

  useEffect(() => {
    setRestartGame(!restartGame)
  }, [oldBoard])

  const handleDimensions = () => {
    if (rectangleWidth !== undefined) {
      return rectangleWidth
    } else {
      return dimensions
    }
  }

  return (
        <main className={'justify-center' + winnerToClassHelper(winnerStatus)} >

            <section className="game" data-testid="gameBoard" style={{
              gridTemplateColumns: `repeat(${handleDimensions()}, 1fr)`
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
