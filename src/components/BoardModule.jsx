import { useEffect, useState } from "react";
import { CellModule } from "./CellModule";

export const BoardModule = ({ dimensions, oldBoard, looseGame, winGame }) => {

    const [restartGame, setRestartGame] = useState(false)

    useEffect(() => {
        setRestartGame(!restartGame)
        setupBoard()
    }, [oldBoard])

    let newBoard = new Array(dimensions)

    for (let x = 0; x < dimensions; x++) {
        newBoard[x] = new Array(dimensions)
    }

    const setupBoard = () => {
        for (let x = 0; x < dimensions; x++) {
            for (let y = 0; y < dimensions; y++) {
                if (oldBoard[x][y] == '💣') {
                    newBoard[x][y] = '💣'
                }
            }
        }
    }

    const checkOtherCells = (row, col) => {
        let winner = true

        newBoard[row][col] = '_';

        for (let x = 0; x < newBoard.length; x++) {
            for (let y = 0; y < newBoard[x].length; y++) {
                if (newBoard[x][y] != '_' && newBoard[x][y] != '💣') {
                    winner = false
                }
            }
        }

        if (winner) {
            winGame()
        }
    }

    return (
        <main className="board">

            <section className="game" style={{
                gridTemplateColumns: `repeat(${dimensions}, 1fr)`
            }}>
                {oldBoard.map((row, indexRow) => {
                    return (
                        row.map((cell, indexColumn) => {
                            return (
                                <CellModule 
                                key={indexColumn} 
                                row={indexRow}
                                column={indexColumn}
                                restartGame={restartGame}
                                looseGame={looseGame}
                                checkOtherCells={checkOtherCells}>
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

/*
    const generateEmptyBoard = (dimensions) => {
        let newBoard = new Array(8)

        for(let x = 0; x < newBoard.length; x++) {
            newBoard[x] = 
        }
    }
     */