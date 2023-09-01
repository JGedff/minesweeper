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
        <div className='mb-15 container' style={{display: 'none'}}>
          <input className='debugInput' data-testid='debugInput' readOnly autoFocus onKeyDown={debugFunction}></input>
            <div className='mockData-container d-flex justify-content-center align-items-center'>
            <textarea className='mockData-textarea' data-testid='mockDataLoader-textarea' autoFocus onChange={handleChange} value={inputText}/>
            <button data-testid='mockDataLoader-loadButton' className='b-gray' onClick={handleClick}>Load board</button>
          </div>
        </div>
  )
}
