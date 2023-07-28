import React, { useEffect, useState } from 'react'

import { cellContent } from '../logic/cellContent'
import { numberToText } from '../logic/cell'

export const CellModule = ({
  children, row, column, restartGame, looseGame, uncoverNumber, cascade, initialVisible,
  removeFlagFromBoard, placeFlagOnBoard, flagsRemaining, disable, finishedGame, DEBUGshowGuide, startGame
}) => {
  const [clicked, setClicked] = useState(false)
  const [flag, setFlag] = useState('no_flag')
  const [uncover, setUncover] = useState(initialVisible)
  const [disableStatus, setDisableStatus] = useState(disable)

  useEffect(() => {
    restartCellStatus()
  }, [restartGame])

  const restartCellStatus = () => {
    setUncover(initialVisible)
    setFlag('no_flag')
    setClicked(false)
    setDisableStatus(disable)
  }

  useEffect(() => {
    setUncover(initialVisible)
  }, [initialVisible])

  useEffect(() => {
    setDisableStatus(disable)
  }, [disable])

  const handleClick = () => {
    if (!finishedGame) {
      startGame()
      setClicked(true)
      setUncover(true)
      if (children === '@') {
        looseGame()
      } else if (children === 0) {
        cascade(row, column)
      } else {
        uncoverNumber(row, column)
      }
      if (flag === 'flag') {
        setFlag('no_flag')
        removeFlagFromBoard(row, column)
      }
    }
  }

  const handleRightClick = (event) => {
    event.preventDefault()
    let newFlagStatus

    if (!finishedGame) {
      if (flag === 'no_flag' && flagsRemaining > 0) {
        newFlagStatus = 'flag'
        placeFlagOnBoard(row, column)
      } else if (flag === 'flag') {
        newFlagStatus = 'maybe_flag'
        removeFlagFromBoard(row, column)
      } else {
        newFlagStatus = 'no_flag'
      }
    } else {
      newFlagStatus = flag
    }

    setFlag(newFlagStatus)
  }

  return (
        <button className={'cell' + numberToText(children, uncover)} data-testid={'r' + (row + 1) + 'c' + (column + 1)} onClick={handleClick} onContextMenu={handleRightClick} disabled={disableStatus} >
            {cellContent(uncover, children, flag, DEBUGshowGuide, clicked, finishedGame)}
        </button>
  )
}
