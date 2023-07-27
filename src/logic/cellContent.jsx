import React from 'react'

import mineExploded from './../assets/mine-exploded.svg'
import mineSave from './../assets/mine-safe.svg'
import { FLAG_STATUS } from './../logic/constants'

export const cellContent = (uncover, children, flag, DEBUGshowGuide, clicked, finishedGame) => {
  let dataTestIdString

  switch (flag) {
    case FLAG_STATUS.NO_FLAG:
      dataTestIdString = 'no_flag'
      break
    case FLAG_STATUS.FLAG:
      dataTestIdString = 'flag'
      break
    case FLAG_STATUS.MAYBE_FLAG:
      dataTestIdString = 'maybe_flag'
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
    if (flag === FLAG_STATUS.FLAG && finishedGame && children !== '@') {
      return (<img className="svg" data-testid={'failed_flag'} src={FLAG_STATUS.FAILED_FLAG} alt="" />)
    } else if (children === '@' && finishedGame) {
      return (<img className="svg" data-testid={dataTestIdString} src={FLAG_STATUS.FLAG} alt="" />)
    } else {
      return (<img className="svg" data-testid={dataTestIdString} src={flag} alt="" />)
    }
  }
}
