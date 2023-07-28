import React from 'react'
import App from './../../App.jsx'
import '@testing-library/jest-dom/extend-expect'
import { expect, jest } from '@jest/globals'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'

jest.setTimeout(80000)

export const loadMockData = async (mockData) => {
  const text = screen.getByTestId('mockDataLoader-textarea')
  const button = screen.getByTestId('mockDataLoader-loadButton')
  userEvent.clear(text)
  await userEvent.type(text, mockData)
  await userEvent.click(button)
  await new Promise(resolve => setTimeout(resolve, 500))
}

export const checkDisabledCell = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  return button.disabled
}

export const checkCoveredCell = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  return button.classList.contains('cover')
}

export const addNonConclusiveToCell = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  fireEvent.contextMenu(button)
  fireEvent.contextMenu(button)
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

export const checkPlayerFlags = (flags) => {
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

export const helloWorldSteps = ({
  given: Given,
  and: And,
  when: When,
  then: Then
}) => {
  Given('the player opens the game', () => {
    render(<App />)
  })

  Given('the player loads the following mock data:', async (mockData) => {
    await loadMockData(mockData)
  })

  When(/^the player uncovers the cell \((\d+),(\d+)\)$/, async (row, col) => {
    const cell = screen.getByTestId(`r${row}c${col}`)
    await userEvent.click(cell)
  })

  When(/^the player marks the cell \((\d+),(\d+)\) with a flag$/, (row, col) => {
    const cell = screen.getByTestId(`r${row}c${col}`)
    fireEvent.contextMenu(cell)
  })

  When(/^the player marks the cell \((\d+),(\d+)\) as non-conclusive$/, (row, col) => {
    const cell = screen.getByTestId(`r${row}c${col}`)
    fireEvent.contextMenu(cell)
    fireEvent.contextMenu(cell)
  })

  When(/^the player does a right click in the cell \((\d+),(\d+)\)$/, async (row, col) => {
    const cell = screen.getByTestId(`r${row}c${col}`)
    fireEvent.contextMenu(cell)
    await new Promise(resolve => setTimeout(resolve, 500))
  })

  When(/^the player clicks the "(.*)" button$/, async (idButton) => {
    const button = screen.getByTestId(idButton)
    await userEvent.click(button)
  })

  Then('all the cells should be covered', () => {
    const board = screen.getByTestId('gameBoard').getElementsByTagName('button')
    let allCellsCovered = true

    for (const cell of board) {
      if (cell.disabled) {
        allCellsCovered = false
      }
    }

    expect(allCellsCovered).toBe(true)
  })

  Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (row, col) => {
    const button = screen.getByTestId(`r${row}c${col}`)
    expect(button.disabled).toBe(true)
  })

  Then(/^the cell \((\d+),(\d+)\) should show: '(\d+)'$/, (row, col, value) => {
    const button = screen.getByTestId(`r${row}c${col}`).innerHTML
    expect(button).toBe(value)
  })

  Then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (row, col) => {
    expect(checkCoveredCell(row, col)).toBe(false)
  })

  Then(/^the cell \((\d+),(\d+)\) should be covered$/, (row, col) => {
    expect(checkCoveredCell(row, col)).toBe(true)
  })

  Then(/^the cell \((\d+),(\d+)\) should show: "(.*)"$/, (row, col, value) => {
    const result = checkStatusOfCell(row, col, value)
    expect(result).toBe(true)
  })

  Then(/^the player should have (\d+) flags$/, (flags) => {
    expect(checkPlayerFlags(flags)).toBe(flags)
  })

  Then('the player should win the game', () => {
    expect(checkGameStatus('win')).toBe(true)
  })

  Then('the player should lose the game', () => {
    expect(checkGameStatus('lost')).toBe(true)
  })

  Then('the game should restart', () => {
    expect(checkGameRestarted()).toBe(true)
  })
}

export default helloWorldSteps
