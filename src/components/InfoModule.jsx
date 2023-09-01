import React, { useEffect } from 'react'
import { getFaceSource } from '../logic/info'

export const InfoModule = ({ flags, faceSource, restartGame, seconds, counter, gameInProgress }) => {
  useEffect(() => {
    if (gameInProgress) {
      const intervalID = setInterval(() => {
        counter()
      }, 1000)
      return () => { clearInterval(intervalID) }
    }
  }, [gameInProgress, seconds])

  return (
        <>
            <div className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 border-b align-middle bg-neutral-900">
                <div className="flagsRemaining d-wrap justify-center text-center align-center">
                    <span className="font-anton text-3xl pt-1 w-full" data-testid='remainingFlags'>{flags}</span>
                    <span className="font-raleway text-xs"> flags remaining </span>
                </div>
                <div className="emojiFace d-flex justify-content-center align-items-center click-pointer" data-testid='faceStatus' onClick={restartGame}>
                    {getFaceSource(faceSource)}
                </div>
                <div className="counter d-wrap justify-content-center align-items-center">
                    <span className="font-anton text-3xl pt-1 w-full" data-testid='secondsPassed'>{seconds}</span>
                    <span className="font-raleway text-xs"> Seconds </span>
                </div>
            </div>
        </>
  )
}
