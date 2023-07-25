import confetti from "canvas-confetti";
import { cloneBoard, generateEmptyBoardWith2Dimensions } from "./board"

export const getFlagsByDimensions = (dimensions) => {
    switch (dimensions) {
        case 8: return 10
        case 16: return 50
        default: return 100
    }
}

export const generateBoardWithMines = (height, width) => {
    let row = 0
    let col = 0
    let mines = getFlagsByDimensions(height)
    let newBoard = generateEmptyBoardWith2Dimensions(height, width)

    while (mines > 0) {
        
        row = Math.trunc(Math.random() * height)
        col = Math.trunc(Math.random() * width)
        
        if (newBoard[row][col] == 0 || newBoard[row][col] == undefined) {
            newBoard[row][col] = '@'

            mines--
        }
    }

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (newBoard[x][y] != '@') {
                newBoard[x][y] = 0
            }
        }
    }

    return newBoard
}

export const numberAdjacentMines = (mineField, x, y, height, width) => {
    let adjacentMines = 0

    for(let row = (x - 1); row < (x + 2); row++) {
        if (row >= 0 && row < height) {
            for(let col = (y - 1); col < (y + 2); col++) {
                if (col >= 0 && col < width) {
                    if (mineField[row][col] == '@') {
                        adjacentMines++
                    }
                }
            }
        }
    }

    return adjacentMines
}

export const setupDangerCells = (oldBoard, height, width) => {
    let newBoard = cloneBoard(oldBoard)

    for (let x = 0; x < oldBoard.length; x++) {
        for (let y = 0; y < oldBoard[x].length; y++) {
            if (oldBoard[x][y] != '@') {
                let adjacentMines = numberAdjacentMines(oldBoard, x, y, height, width)

                newBoard[x][y] = adjacentMines
            }
        }
    }
    return newBoard
}

export const generateBoard = (height, width) => {
    let newBoard = generateBoardWithMines(height, width)

    newBoard = setupDangerCells(newBoard, height, width)

    return newBoard
}

export const checkOtherCellsToWin = (visibleBoard, board, row, col, winGame) => {
    let winner = true
    let newBoard = cloneBoard(visibleBoard)

    newBoard[row][col] = true

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (newBoard[x][y] != true && board[x][y] != '@') {
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

export const validPosition = (width, height, number1, number2) => {
    return (0 <= number1) && (number1 < width) && (0 <= number2) && (number2 < height)
}

export const showAllMines = (visibleBoard, board) => {
    let newBoard = cloneBoard(visibleBoard)

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y] == '@') {
                newBoard[x][y] = true
            }
        }
    }

    return newBoard
}

export const disableAllCells = (board) => {
    let newBoard = cloneBoard(board)

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            newBoard[x][y] = "undefined"
        }
    }

    return newBoard
}

export const generateMatrix = (dimensions, content) => {
    let newBoard = new Array(dimensions)
    for (let indexRow = 0; indexRow < dimensions; indexRow++) {
        newBoard[indexRow] = new Array(dimensions)
        for (let indexColumn = 0; indexColumn < dimensions; indexColumn++) {
            newBoard[indexRow][indexColumn] = content
        }
    }
    return newBoard
}