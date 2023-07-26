export const generateEmptyBoardWith2Dimensions = (height, width) => {
  const newBoard = new Array(height)

  for (let x = 0; x < height; x++) {
    newBoard[x] = new Array(width)
  }

  return newBoard
}

export const cloneBoard = (oldBoard) => {
  const newBoard = generateEmptyBoardWith2Dimensions(oldBoard.length, oldBoard[0].length)

  for (let x = 0; x < newBoard.length; x++) {
    for (let y = 0; y < newBoard[x].length; y++) {
      newBoard[x][y] = oldBoard[x][y]
    }
  }

  return newBoard
}
