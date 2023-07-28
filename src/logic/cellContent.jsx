import React from 'react'

import mineExploded from './../assets/mine-exploded.svg'
import mineSave from './../assets/mine-safe.svg'

export const cellContent = (uncover, children, initialFlag, DEBUGshowGuide, clicked, finishedGame) => {
  let src
  let flag

  if (finishedGame && children === '@') {
    flag = 'flag'
  } else {
    flag = initialFlag
  }

  switch (flag) {
    case 'no_flag':
      src = ''
      break
    case 'flag':
      src = './src/assets/flag.svg'
      break
    case 'maybe_flag':
      src = './src/assets/flag-unknown.svg'
      break
    default: break
  }

  if (DEBUGshowGuide) return children

  if (uncover) {
    if (children === '@' && clicked) {
      return (<img className="svg" data-testid='mineExploded' src={mineExploded} alt="" />)
    } else if (children === '@') {
      return (<img className="svg" data-testid='mineSaved' src={mineSave} />)
    } else if (children !== 0) {
      return children
    }
  } else {
    if (flag === 'flag' && finishedGame && children !== '@') {
      return (<img className="svg" data-testid={'failed_flag'} src={'./src/assets/flag-failed.svg'} alt="" />)
    } else if (children === '@' && finishedGame) {
      return (<img className="svg" data-testid={flag} src={src} alt="" />)
    } else {
      return (<img className="svg" data-testid={flag} src={src} alt="" />)
    }
  }
}
