import { useEffect, useState } from "react"

export const CellModule = ({ children, row, column, restartGame }) => {

    const [enable, setEnabled] = useState(false)
    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        setEnabled(!enable)
        setVisible(!visible)
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
    }

    useEffect(() => {
        setEnabled(false) 
        setVisible(false) 
    }, [restartGame])
    
    const uncoveredContent = () => {
        return visible && children !== 0
    }

    return (
        <button className={"cell" + numberToText(children)} onClick={handleClick} onContextMenu={handleRightClick} disabled={enable} >
            {uncoveredContent() && children}
        </button>
    )
}
