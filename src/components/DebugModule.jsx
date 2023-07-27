
import React from 'react'

export const DebugModule = ({ debugFunction }) => {
  return (
        <input className='debugInput' data-testid='debugInput' readOnly autoFocus onKeyDown={debugFunction}></input>
  )
}
