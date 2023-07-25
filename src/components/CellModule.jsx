import { useEffect, useState } from "react"

import mineExploded from "./../assets/mine-exploded.svg";
import mineSave from "./../assets/mine-safe.svg";
import flag from "./../assets/flag.svg";
import flag_unknown from "./../assets/flag-unknown.svg";
import flag_failed from "./../assets/flag-failed.svg";

import { getDisable, numberToText } from "../logic/cell";

export const FLAG_STATUS = {
    NO_FLAG: '',
    FLAG: flag,
    MAYBE_FLAG: flag_unknown,
    FAILED_FLAG: flag_failed
}

export const CellModule = ({
    children, row, column, restartGame, looseGame, uncoverNumber, cascade, initialVisible,
    addAFlag, substractAFlag, flagsRemaining, disable, finishedGame, DEBUGshowGuide, startGame
    }) => {

    const [clicked, setClicked] = useState(false)
    const [flag, setFlag] = useState(FLAG_STATUS.NO_FLAG)
    const [uncover, setUncover] = useState(initialVisible)
    const [disableStatus, setDisableStatus] = useState(disable)

    useEffect(() => {
        setUncover(initialVisible)
        setFlag(FLAG_STATUS.NO_FLAG)
        setClicked(false)
        setDisableStatus(disable)
    }, [restartGame])

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

    const setClickedAndUncoverTrue = () => {
        setClicked(true)
        setUncover(true)
    }

    const handleClick = () => {
        startGame()

        if (!finishedGame) {
            setClickedAndUncoverTrue()

            if (children === '@') {
                looseGame()
            } else if (children === 0) {
                cascade(row, column)
            } else {
                uncoverNumber(row, column)
            }

            if (flag === FLAG_STATUS.FLAG) {
                setFlag(FLAG_STATUS.NO_FLAG)
                addAFlag(row, column)
            }
        }
    }

    const handleRightClick = (event) => {
        event.preventDefault();

        if (flag === FLAG_STATUS.NO_FLAG && flagsRemaining > 0) {
            setFlag(FLAG_STATUS.FLAG)
            substractAFlag(row, column)
        } else if (flag === FLAG_STATUS.FLAG) {
            setFlag(FLAG_STATUS.MAYBE_FLAG)
            addAFlag(row, column)
        } else {
            setFlag(FLAG_STATUS.NO_FLAG)
        }
    }

    const cellContent = (uncover, children, mineExploded, flag, DEBUGshowGuide) => {
        if (DEBUGshowGuide) return children
        if (uncover) {
            if (children === '@' && clicked) {
                return (<img className="svg" src={mineExploded} alt="" />)
            } else if (children === '@') {
                return (<img className="svg" src={mineSave} />)
            } else if (children !== 0) {
                return children
            }
        } else {
            if (flag === FLAG_STATUS.FLAG && finishedGame) {
                return (<img className="svg" src={FLAG_STATUS.FAILED_FLAG} alt="" />)
            } else {
                return (<img className="svg" src={flag} alt="" />)
            }
        }
    }

    return (
        <button className={"cell" + numberToText(children)} onClick={handleClick} onContextMenu={handleRightClick} disabled={disableStatus} >
            {cellContent(uncover, children, mineExploded, flag, DEBUGshowGuide)}
        </button>
    )
}
