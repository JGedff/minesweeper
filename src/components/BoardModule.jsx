import { useEffect, useState } from "react";
import { CellModule } from "./CellModule";

export const BoardModule = ({ dimensions, board }) => {

    const [restartGame, setRestartGame] = useState(false)

    useEffect(() => {
        setRestartGame(!restartGame)
    }, [board])

    return (
        <main className="board">

            <section className="game" style={{
                gridTemplateColumns: `repeat(${dimensions}, 1fr)`
            }}>
                {board.map((row, indexRow) => {
                    return (
                        row.map((cell, indexColumn) => {
                            return (
                                <CellModule 
                                key={indexColumn} 
                                row={indexRow}
                                column={indexColumn}
                                restartGame={restartGame}>
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