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
            <div className="fixed top-0 left-0 z-50 flex w-full p-4 border-b bg-neutral-900">
                <div className="border-2 border-yellow-400 text-yellow-400 bg-black rounded-2xl w-full flex flex-wrap justify-center text-center align-center">
                    <span className="font-anton text-3xl w-full pt-1" data-testid='remainingFlags'>{flags}</span>
                    <span className="font-raleway text-xs"> Flags remaining </span>
                </div>
                <div className="font-emoji text-5xl flex w-full justify-center items-center cursor-pointer" data-testid='faceStatus' onClick={restartGame}>
                    {getFaceSource(faceSource)}
                </div>
                <div className="border-2 border-yellow-400 text-yellow-400 font- rounded-2xl bg-black w-full flex flex-wrap justify-center items-center">
                    <span className="font-anton text-3xl pt-1 w-full text-center" data-testid='secondsPassed'>{seconds}</span>
                    <span className="font-raleway text-xs"> Seconds </span>
                </div>
            </div>
        </>
  )
}
