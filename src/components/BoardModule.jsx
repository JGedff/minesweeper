import { useEffect, useState } from "react";
import { CellModule } from "./CellModule";

export const BoardModule = ({ dimensions, flags }) => {

    const [board, setBoard] = useState(Array(8).fill(Array(8).fill(null)))

    useEffect(() => {
        setBoard(Array(dimensions).fill(Array(dimensions).fill(null)))
    }, [dimensions])

    const uncoverCell = (row, column) => {
        return board[row][column]
    }
    
    const generateBoard = () => {
        let row = 0
        let col = 0
        let mines = flags
        let newBoard = Array(8).fill(Array(8).fill(null))



        console.log(newBoard)
        while (mines > 0) {
            
            row = Math.round(Math.random() * dimensions)
            col = Math.round(Math.random() * dimensions)
            console.log('minas restantes: '+mines + "elegida bomba en fila y columna:"+row+' '+col)
            
            if (newBoard[row][col] == null) {
                newBoard[row][col] = -1

                mines--
            }
            console.log(newBoard)
        }

        return newBoard
    }

    const generateAndSetBoard = () => {
        setBoard(generateBoard())
    }

    return (
        <main className="board">
            <button onClick={generateAndSetBoard}> Reset / Generate a new mine field </button>

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
                                onclickFunction={uncoverCell}>
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