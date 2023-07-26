/* eslint-disable react/react-in-jsx-scope */

import { useEffect, useState } from 'react'

import { CellModule } from './CellModule'

export const BoardModule = ({
  dimensions, oldBoard, visibleBoard, updateVisibleBoard, cascade, looseGame, placeFlagOnBoard,
  removeFlagFromBoard, flagsRemaining, disableStatus, finishedGame, DEBUGshowGuide, startGame
}) => {
  const [restartGame, setRestartGame] = useState(false)

  useEffect(() => {
    setRestartGame(!restartGame)
  }, [oldBoard])

  return (
        <main className="board">

            <section className="game" style={{
              gridTemplateColumns: `repeat(${dimensions}, 1fr)`
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
