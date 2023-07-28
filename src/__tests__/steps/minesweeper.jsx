import React from 'react'
import App from '../../App.jsx'
import '@testing-library/jest-dom/extend-expect'
import { expect } from '@jest/globals'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent } from '@testing-library/react'
import { checkCoveredCell, checkGameRestarted, checkGameStatus, checkPlayerFlags, checkStatusOfCell, loadMockData } from './stepFunctions.js'

export const minesweeper = ({
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
    expect(checkPlayerFlags()).toBe(flags)
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

export default minesweeper
