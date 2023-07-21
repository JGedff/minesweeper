import { useState } from "react"

export const CellModule = ({ children, row, column, onclickFunction }) => {

    const [enable, setEnabled] = useState(false)

    const handleClick = () => {
        console.log(onclickFunction(row, column))
        setEnabled(!enable)
    }
    
    return(
        <button className="cell" onClick={handleClick} disabled={enable} > { children } </button>
    )
}
