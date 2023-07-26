import flag from "./../assets/flag.svg";
import flag_unknown from "./../assets/flag-unknown.svg";
import flag_failed from "./../assets/flag-failed.svg";  

export const FLAG_STATUS = {
    NO_FLAG: '',
    FLAG: flag,
    MAYBE_FLAG: flag_unknown,
    FAILED_FLAG: flag_failed
}

export const numberToText = (number) => {
    let numberTexted;
    switch (number) {
        case 1: numberTexted = ' one'; break;
        case 2: numberTexted = ' two'; break;
        case 3: numberTexted = ' three'; break;
        case 4: numberTexted = ' four'; break;
        case 5: numberTexted = ' five'; break;
        case 6: numberTexted = ' six'; break;
        case 7: numberTexted = ' seven'; break;
        case 8: numberTexted = ' eight'; break;
        default: numberTexted = ''; break;
    }
    return numberTexted
}

export const getDisable = (uncover) => {
    if (uncover != true) {
        return false
    } else {
        return true
    }
}