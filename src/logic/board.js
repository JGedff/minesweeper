export const generateEmptyBoardWith2Dimensions = (heigh, width) => {
    let newBoard = new Array(heigh)

    for (let x = 0; x < heigh; x++) {
        newBoard[x] = new Array(width)
    }

    return newBoard
}

export const cloneBoard = (oldBoard) => {
    let newBoard = generateEmptyBoardWith2Dimensions(oldBoard.length, oldBoard[0].length)

    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            newBoard[x][y] = oldBoard[x][y]
        }
    }

    return newBoard
}

export const setupBoardToFalse = (height, width) => {
    let minefield = generateEmptyBoardWith2Dimensions(height, width)

    for (let x = 0; x < minefield.length; x++) {
        for (let y = 0; y < minefield[x].length; y++) {
            minefield[x][y] = false
        }
    }

    return minefield
}