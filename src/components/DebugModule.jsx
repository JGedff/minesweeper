import React, { useState } from 'react'

export const DebugModule = ({ getMockData }) => {
  const [inputText, setInputText] = useState('')

  const handleChange = (event) => {
    setInputText(event.target.value)
  }
  const handleClick = () => {
    getMockData(inputText)
  }

  console.log('Debug module started')
  return (
    <>
      <div className='flex place-content-center mockData-container'>
        <div className='flex justify-center place-content-center p-4 bg-neutral-900 rounded-md'>
          <textarea className='mockData-textarea p-1.5 mr-4' data-testid='mockDataLoader-textarea' autoFocus onChange={handleChange} value={inputText} placeholder='Insert your mock data here.' />
          <button data-testid='mockDataLoader-loadButton' className='bg-neutral-700' onClick={handleClick}>Load board</button>
        </div>
      </div>
    </>
  )
}
