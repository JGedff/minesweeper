import confetti from "canvas-confetti";
import { cloneBoard, generateEmptyBoardWith2Dimensions } from "./board"

export const generateBoardWithMines = (flags, heigh, width) => {
    let row = 0
    let col = 0
    let mines = flags
    let newBoard = generateEmptyBoardWith2Dimensions(heigh, width)

    while (mines > 0) {
        
        row = Math.trunc(Math.random() * heigh)
        col = Math.trunc(Math.random() * width)
        
        if (newBoard[row][col] == 0 || newBoard[row][col] == undefined) {
            newBoard[row][col] = '💣'

            mines--
        }
    }

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (newBoard[x][y] != '💣') {
                newBoard[x][y] = 0
            }
        }
    }

    return newBoard
}

export const numberAdjacentMines = (mineField, x, y, heigh, width) => {
    let adjacentMines = 0

    for(let row = (x - 1); row < (x + 2); row++) {
        if (row >= 0 && row < heigh) {
            for(let col = (y - 1); col < (y + 2); col++) {
                if (col >= 0 && col < width) {
                    if (mineField[row][col] == '💣') {
                        adjacentMines++
                    }
                }
            }
        }
    }

    return adjacentMines
}

export const setupDangerCells = (oldBoard, heigh, width) => {
    let newBoard = cloneBoard(oldBoard)

    for (let x = 0; x < oldBoard.length; x++) {
        for (let y = 0; y < oldBoard[x].length; y++) {
            if (oldBoard[x][y] != '💣') {
                let adjacentMines = numberAdjacentMines(oldBoard, x, y, heigh, width)

                newBoard[x][y] = adjacentMines
            }
        }
    }
    return newBoard
}

export const generateBoard = (flags, heigh, width) => {
    let newBoard = generateBoardWithMines(flags, heigh, width)

    newBoard = setupDangerCells(newBoard, heigh, width)

    return newBoard
}

export const checkOtherCellsToWin = (visibleBoard, board, row, col, winGame) => {
    let winner = true
    let newBoard = cloneBoard(visibleBoard)

    newBoard[row][col] = true

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (newBoard[x][y] != true && board[x][y] != '💣') {
                winner = false
            }
        }
    }

    if (winner) {
        winGame()
        confetti()
    }

    return newBoard
}