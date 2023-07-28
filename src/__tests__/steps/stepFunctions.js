import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/react'

export const loadMockData = async (mockData) => {
  const text = screen.getByTestId('mockDataLoader-textarea')
  const button = screen.getByTestId('mockDataLoader-loadButton')
  userEvent.clear(text)
  await userEvent.type(text, mockData)
  await userEvent.click(button)
  await new Promise(resolve => setTimeout(resolve, 500))
}

export const checkCoveredCell = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  return button.classList.contains('cover')
}

export const checkStatusOfCell = (row, column, value) => {
  let flagValueToClass

  switch (value) {
    case '.':
      flagValueToClass = 'no_flag'
      break
    case '!':
      flagValueToClass = 'flag'
      break
    case '?':
      flagValueToClass = 'maybe_flag'
      break
    case 'x':
      flagValueToClass = 'failed_flag'
      break
    case '@':
      flagValueToClass = 'mineExploded'
      break
    case '#':
      flagValueToClass = 'mineSaved'
      break
  }

  const flag = screen.getByTestId(`r${row}c${column}`)
  const flag2 = flag.firstElementChild
  const flag3 = flag2.getAttribute('data-testid')
  const isInClassList = flag3 === flagValueToClass
  return isInClassList
}

export const checkPlayerFlags = () => {
  const flagsCounter = screen.getByTestId('remainingFlags').innerHTML.trim()
  return flagsCounter
}

export const checkGameStatus = (status) => {
  const container = screen.getByTestId('container')
  const faceStatus = screen.getByTestId('faceStatus').innerHTML

  const isExpectedStatus = container.classList.contains(status)
  const isExpectedFace = (status === 'win' && faceStatus === '😊') || (status === 'lost' && faceStatus === '☹️')

  return isExpectedStatus && isExpectedFace
}

export const checkGameRestarted = () => {
  const flags = screen.getByTestId('remainingFlags').innerHTML.trim()
  const faceStatus = screen.getByTestId('faceStatus').innerHTML
  const seconds = screen.getByTestId('secondsPassed').innerHTML.trim()

  let gameRestarted = true

  if (flags === '10') {
    if (seconds === '0') {
      if (faceStatus === '😐') {
        gameRestarted = true
      } else {
        gameRestarted = false
      }
    } else {
      gameRestarted = false
    }
  } else {
    gameRestarted = false
  }

  return gameRestarted
}
