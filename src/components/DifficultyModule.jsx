import React from 'react'

export const DifficultyModule = ({ easyFunction, normalFunction, hardFunction }) => {
  return (
        <footer className="chooseDificulty">
            <button onClick={easyFunction} data-testid='difficultyEasyButton' > easy </button>
            <button onClick={normalFunction} data-testid='difficultyNormalButton' > normal </button>
            <button onClick={hardFunction} data-testid='difficultyHardButton' > hard </button>
        </footer>
  )
}
