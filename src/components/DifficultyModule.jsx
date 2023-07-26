/* eslint-disable react/react-in-jsx-scope */

export const DifficultyModule = ({ easyFunction, normalFunction, hardFunction }) => {
  return (
        <footer className="chooseDificulty">
            <button onClick={easyFunction}> easy </button>
            <button onClick={normalFunction}> normal </button>
            <button onClick={hardFunction}> hard </button>
        </footer>
  )
}
