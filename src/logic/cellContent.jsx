import mineExploded from "./../assets/mine-exploded.svg";
import mineSave from "./../assets/mine-safe.svg";
import { FLAG_STATUS } from "./../logic/constants";

export const cellContent = (uncover, children, flag, DEBUGshowGuide, clicked, finishedGame) => {
    if (DEBUGshowGuide) return children
    
    if (uncover) {
        if (children === '@' && clicked) {
            return (<img className="svg" src={mineExploded} alt="" />)
        } else if (children === '@') {
            return (<img className="svg" src={mineSave} />)
        } else if (children !== 0) {
            return children
        }
    } else {
        if (flag === FLAG_STATUS.FLAG && finishedGame) {
            return (<img className="svg" src={FLAG_STATUS.FAILED_FLAG} alt="" />)
        } else if (children === '@' && finishedGame) {
            return (<img className="svg" src={FLAG_STATUS.FLAG} alt="" />)
        } else {
            return (<img className="svg" src={flag} alt="" />)
        }
    }
}