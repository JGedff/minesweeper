import React, { useEffect, useState } from 'react'

import { CellModule } from './CellModule'
import { winnerToClassHelper } from '../logic/board'

export const BoardModule = ({
  dimensions, rectangleWidth, oldBoard, visibleBoard, updateVisibleBoard, cascade, looseGame, placeFlagOnBoard,
  removeFlagFromBoard, flagsRemaining, disableStatus, finishedGame, DEBUGshowGuide, startGame, winnerStatus
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
                                uncoverNumber={updateVisibleBoard}
                                cascade={cascade}
                                initialVisible={visibleBoard[indexRow][indexColumn]}
                                removeFlagFromBoard={removeFlagFromBoard}
                                placeFlagOnBoard={placeFlagOnBoard}
                                flagsRemaining={flagsRemaining}
                                disable={disableStatus[indexRow][indexColumn]}
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
