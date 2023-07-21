import propTypes from "prop-types";

export const InfoModule = ({ flags, faceSource }) => {
    let seconds = 2
    let sadFace = '☹️'
    let seriousFace = '😐'
    let happyFace = '😊'

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="flagsRemaining d-wrap justify-content-center text-align-center align-items-center">
                <span className="w-100 counterNumber"> { flags } </span>
                <span className="counterDescription"> flags remaining </span>
            </div>
            <div className="emojiFace d-flex justify-content-center align-items-center">
                {/* <img src={ faceSource } width='150px' height='150px' /> */}
                { faceSource === 2 && <div>{sadFace}</div>}
                { faceSource === 0 && <div>{seriousFace}</div>}
                { faceSource === 1 && <div>{happyFace}</div>}
            </div>
            <div className="counter d-wrap justify-content-center align-items-center">
                <span className="w-100 counterNumber"> { seconds } </span>
                <span className="counterDescription"> Seconds </span>
            </div>
        </div>
    )
}

InfoModule.propTypes = {

    flags: propTypes.number.isRequired,
    faceSource: propTypes.number.isRequired,
}