import { getFaceSource } from "../logic/info"

export const InfoModule = ({ flags, faceSource, restartGame }) => {
    let seconds = 2

    const handleClick = () => {
        restartGame()
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="flagsRemaining d-wrap justify-content-center text-align-center align-items-center">
                    <span className="w-100 counterNumber"> { flags } </span>
                    <span className="counterDescription"> flags remaining </span>
                </div>
                <div className="emojiFace d-flex justify-content-center align-items-center click-pointer" onClick={handleClick}>
                    {getFaceSource(faceSource)}
                </div>
                <div className="counter d-wrap justify-content-center align-items-center">
                    <span className="w-100 counterNumber"> { seconds } </span>
                    <span className="counterDescription"> Seconds </span>
                </div>
            </div>
        </>
    )
}