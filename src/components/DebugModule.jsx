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
        <div style={{ display: 'none' }}>
          <input className='opacity-0 cursor-default static bg-orange-950 top-4 start-0 w-14 h-14 flex' data-testid='debugInput' readOnly autoFocus onKeyDown={debugFunction}></input>

          <div className='mb-4 mt-8 flex'>
            <div className='mockData-container flex w-full justify-center items-center'>
              <textarea className='mockData-textarea p-1.5 mr-4' data-testid='mockDataLoader-textarea' autoFocus onChange={handleChange} value={inputText}/>
              <button data-testid='mockDataLoader-loadButton' className='bg-neutral-700' onClick={handleClick}>Load board</button>
            </div>
          </div>
        </div>
  )
}
