import React from 'react'

export const DifficultyModule = ({ easyFunction, normalFunction, hardFunction }) => {
  return (
        <footer className="justify-around p-2.5 flex fixed bottom-0 w-full p-4 start-0 bg-neutral-900 border-t h-20">
            <button className="font-bold border-2 border-white" onClick={easyFunction} data-testid='difficultyEasyButton' > easy </button>
            <button className="font-bold border-2 border-white" onClick={normalFunction} data-testid='difficultyNormalButton' > normal </button>
            <button className="font-bold border-2 border-white" onClick={hardFunction} data-testid='difficultyHardButton' > hard </button>
        </footer>
  )
}
