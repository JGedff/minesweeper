import React from 'react'
import App from './../../App.jsx'
import '@testing-library/jest-dom/extend-expect'
import { expect, jest } from '@jest/globals'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

export const loadMockData = (mockData) => {
  userEvent.keyboard('{ctrl}m')
  jest.spyOn(window, 'prompt').mockImplementation(() => mockData)
}

export const checkDisabledCell = async (row, column, status) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  await waitFor(() => {
    expect(button.disabled).toBe(status)
  })
}

export const checkCoveredCell = async (row, column, status) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  await waitFor(() => {
    expect(button.classList.contains('cover')).toBe(status)
  })
}

export const checkCellShouldShow = async (row, column, value) => {
  const button = screen.getByTestId(`r${row}c${column}`).innerHTML
  await waitFor(() => {
    expect(button).toBe(value)
  })
}

export const addFlagToCell = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  fireEvent.contextMenu(button)
}

export const addNonConclusiveToCell = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  fireEvent.contextMenu(button)
  fireEvent.contextMenu(button)
}

export const checkStatusOfCell = async (row, column, value) => {
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
      flagValueToClass = 'flag_failed'
      break
  }
  const flag = screen.getByTestId(`r${row}c${column}`).children.classList
  await waitFor(() => {
    expect(flag).toContain(flagValueToClass)
  })
}

export const checkPlayerFlags = async (flags) => {
  const flagsCounter = screen.getByTestId('remainingFlags').innerHTML
  await waitFor(() => {
    expect(flagsCounter).toBe(flags)
  })
}

export const unmarkCellWithFlag = (row, column) => {
  const button = screen.getByTestId(`r${row}c${column}`)
  fireEvent.contextMenu(button)
  fireEvent.contextMenu(button)
}

export const checkGameStatus = async (status) => {
  const container = screen.getByTestId('container')
  const faceStatus = screen.getByTestId('faceStatus').innerHTML

  const isExpectedStatus = container.classList.contains(status)
  const isExpectedFace = (status === 'win' && faceStatus === '😊') || (status === 'lost' && faceStatus === '☹️')

  await waitFor(() => {
    expect(isExpectedStatus && isExpectedFace).toBe(true)
  })
}

export const checkGameRestarted = async () => {
  await waitFor(() => {
    const flags = screen.getByTestId('remainingFlags').innerHTML
    const faceStatus = screen.getByTestId('faceStatus').innerHTML
    const seconds = screen.getByTestId('secondsPassed').innerHTML

    let gameRestarted = true

    if (flags === 10) {
      if (seconds === 0) {
        if (faceStatus !== '😐') {
          gameRestarted = false
        }
      } else {
        gameRestarted = false
      }
    } else {
      gameRestarted = false
    }

    expect(gameRestarted).toBe(true)
  })
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

  Given('the player loads the following mock data:', (mockData) => {
    loadMockData(mockData)
  })

  When(/^the player uncovers the cell \((\d+),(\d+)\)$/, (row, col) => {
    const cell = screen.getByTestId(`r${row}c${col}`)
    fireEvent.click(cell)
  })

  When(/^the player marks the cell \((\d+),(\d+)\) with a flag$/, (row, col) => {
    addFlagToCell(row, col)
  })

  When(/^the player marks the cell \((\d+),(\d+)\) as non-conclusive$/, (row, col) => {
    addNonConclusiveToCell(row, col)
  })

  When(/^the player does a right click in the cell \((\d+),(\d+)\)$/, (row, col) => {
    const cell = screen.getByTestId(`r${row}c${col}`)
    fireEvent.contextMenu(cell)
  })

  When(/^the player unmarks the flagged cell \((\d+),(\d+)\)$/, (row, col) => {
    unmarkCellWithFlag(row, col)
  })

  When(/^the player clicks the "(.*)" button$/, (idButton) => {
    const button = screen.getByTestId(idButton)
    fireEvent.click(button)
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
    checkDisabledCell(row, col, true)
  })

  Then(/^the cell \((\d+),(\d+)\) should show: '(\d+)'$/, (row, col, value) => {
    checkCellShouldShow(row, col, value)
  })

  Then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (row, col) => {
    checkCoveredCell(row, col, false)
  })

  Then(/^the cell \((\d+),(\d+)\) should be covered$/, (row, col) => {
    checkCoveredCell(row, col, true)
  })

  Then(/^the cell \((\d+),(\d+)\) should show: "(.*)"$/, (row, col, value) => {
    checkStatusOfCell(row, col, value)
  })

  Then(/^the player should have (.*) flags$/, (flags) => {
    checkPlayerFlags(flags)
  })

  Then('the player should win the game', () => {
    checkGameStatus('win')
  })

  Then('the player should lose the game', () => {
    checkGameStatus('lost')
  })

  Then('the game should restart', () => {
    checkGameRestarted()
  })
}

export default helloWorldSteps
