import { useEffect, useState } from "react"

import { stopContextMenu } from "../logic/app";
import { cellContent } from "../logic/cellContent";
import { numberToText } from "../logic/cell";
import { FLAG_STATUS } from "../logic/constants";

export const CellModule = ({
    children, row, column, restartGame, looseGame, uncoverNumber, cascade, initialVisible,
    removeFlagFromBoard, placeFlagOnBoard, flagsRemaining, disable, finishedGame, DEBUGshowGuide, startGame
    }) => {

    const [clicked, setClicked] = useState(false)
    const [flag, setFlag] = useState(FLAG_STATUS.NO_FLAG)
    const [uncover, setUncover] = useState(initialVisible)
    const [disableStatus, setDisableStatus] = useState(disable)

    useEffect(() => {
        restartCellStatus()
    }, [restartGame])

    const restartCellStatus = () => {
        setUncover(initialVisible)
        setFlag(FLAG_STATUS.NO_FLAG)
        setClicked(false)
        setDisableStatus(disable)
    }

    useEffect(() => {
        setUncover(initialVisible)
    }, [initialVisible])

    useEffect(() => {
        if (disable == "undefined") {
            setDisableStatus(true)
        } else {
            setDisableStatus(disable)
        }
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
            if (flag === FLAG_STATUS.FLAG) {
                setFlag(FLAG_STATUS.NO_FLAG)
                removeFlagFromBoard(row, column)
            }
        }
    }

    const handleRightClick = (event) => {
        stopContextMenu(event)
        if (!finishedGame) {
            if (flag === FLAG_STATUS.NO_FLAG && flagsRemaining > 0) {
                setFlag(FLAG_STATUS.FLAG)
                placeFlagOnBoard(row, column)
            } else if (flag === FLAG_STATUS.FLAG) {
                setFlag(FLAG_STATUS.MAYBE_FLAG)
                removeFlagFromBoard(row, column)
            } else {
                setFlag(FLAG_STATUS.NO_FLAG)
            }
        }
    }

    return (
        <button className={"cell" + numberToText(children)} onClick={handleClick} onContextMenu={handleRightClick} disabled={disableStatus} >
            {cellContent(uncover, children, flag, DEBUGshowGuide, clicked, finishedGame)}
        </button>
    )
}
