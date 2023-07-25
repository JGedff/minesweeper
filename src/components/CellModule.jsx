import { useEffect, useState } from "react"

import mineExploded from "./../assets/mine-exploded.svg";
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
    addAFlag, substractAFlag, flagsRemaining
    }) => {

    const [uncover, setUncover] = useState(initialVisible)
    const [flag, setFlag] = useState(FLAG_STATUS.NO_FLAG)

    const handleClick = () => {
        let newUncover = !uncover
        setUncover(newUncover)
        if (children === '💣') {
            looseGame()
        } else if (children === 0) {
            cascade(row, column)
        } else {
            uncoverNumber(row, column)
        }
    }

    const handleRightClick = (event) => {
        event.preventDefault();

        if (flag === FLAG_STATUS.NO_FLAG && flagsRemaining > 0) {
            setFlag(FLAG_STATUS.FLAG)
            substractAFlag()
        } else if (flag === FLAG_STATUS.FLAG) {
            setFlag(FLAG_STATUS.MAYBE_FLAG)
            addAFlag()
        } else {
            setFlag(FLAG_STATUS.NO_FLAG)
        }
    }

    useEffect(() => {
        setUncover(initialVisible)
        setFlag(FLAG_STATUS.NO_FLAG)
    }, [restartGame])

    useEffect(() => {
        setUncover(initialVisible)
    }, [initialVisible])

    const cellContent = () => {
        if (uncover) {
            if (children === '💣') {
                return (<img className="svg" src={mineExploded} alt="" />)
            } else if (children !== 0) {
                return children
            }
        } else {
            return (<img className="svg" src={flag} alt="" />)
        }
    }

    return (
        <button className={"cell" + numberToText(children)} onClick={handleClick} onContextMenu={handleRightClick} disabled={getDisable(uncover)} >
            {cellContent(uncover, children, mineExploded, flag)}
        </button>
    )
}
