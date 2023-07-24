import { useEffect, useState } from "react"
import mineExploded from "./../assets/mine-exploded.svg";
import flag from "./../assets/flag.svg";
import flag_unknown from "./../assets/flag-unknown.svg";
import flag_failed from "./../assets/flag-failed.svg";

export const FLAG_STATUS = {
    NO_FLAG: '',
    FLAG: flag,
    MAYBE_FLAG: flag_unknown,
    FAILED_FLAG: flag_failed
}

export const CellModule = ({ children, row, column, restartGame, looseGame, checkOtherCells }) => {

    const [enable, setEnabled] = useState(false)
    const [visible, setVisible] = useState(false)
    const [flag, setFlag] = useState(FLAG_STATUS.NO_FLAG)

    const handleClick = () => {
        setEnabled(!enable)
        setVisible(!visible)
        if (children === '💣') {
            looseGame()
        } else {
            checkOtherCells(row, column)
        }
    }

    const numberToText = (number) => {
        let numberTexted;
        switch (number) {
            case 1: numberTexted = ' one'; break;
            case 2: numberTexted = ' two'; break;
            case 3: numberTexted = ' three'; break;
            case 4: numberTexted = ' four'; break;
            case 5: numberTexted = ' five'; break;
            case 6: numberTexted = ' six'; break;
            case 7: numberTexted = ' seven'; break;
            case 8: numberTexted = ' eight'; break;
            default: numberTexted = ''; break;
        }
        return numberTexted
    }

    const handleRightClick = (event) => {
        event.preventDefault();

        if (flag === FLAG_STATUS.NO_FLAG) {
            setFlag(FLAG_STATUS.FLAG)
        } else if (flag === FLAG_STATUS.FLAG) {
            setFlag(FLAG_STATUS.MAYBE_FLAG)
        } else {
            setFlag(FLAG_STATUS.NO_FLAG)
        }
    }

    useEffect(() => {
        setEnabled(false) 
        setVisible(false)
        setFlag(FLAG_STATUS.NO_FLAG)
    }, [restartGame])
    
    const cellContent = () => {
        if (visible) {
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
        <button className={"cell" + numberToText(children)} onClick={handleClick} onContextMenu={handleRightClick} disabled={enable} >
            {cellContent()}
        </button>
    )
}
