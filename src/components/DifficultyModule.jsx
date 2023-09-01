import React from 'react'

export const DifficultyModule = ({ easyFunction, normalFunction, hardFunction }) => {
  return (
        <footer className="chooseDificulty flex fixed bottom-0 w-full p-4 pb-6 start-0 bg-neutral-900 border-t">
            <button onClick={easyFunction} data-testid='difficultyEasyButton' > easy </button>
            <button onClick={normalFunction} data-testid='difficultyNormalButton' > normal </button>
            <button onClick={hardFunction} data-testid='difficultyHardButton' > hard </button>
        </footer>
  )
}
