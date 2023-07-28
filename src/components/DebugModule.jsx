import React, { useState } from 'react'

export const DebugModule = ({ debugFunction, getMockData }) => {
  const [inputText, setInputText] = useState('')
  const handleChange = (event) => {
    setInputText(event.target.value)
  }
  const handleClick = () => {
    getMockData(inputText)
  }

  return (
    <>
    <input className='debugInput' data-testid='debugInput' readOnly autoFocus onKeyDown={debugFunction}></input>
            <div className='mockData-container'>
            <textarea className='mockData-textarea' data-testid='mockDataLoader-textarea' autoFocus onChange={handleChange} value={inputText}/>
            <button data-testid='mockDataLoader-loadButton' onClick={handleClick}>Crear</button>
        </div>
    </>

  )
}
