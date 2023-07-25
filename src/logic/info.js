const sadFace = '☹️'
const seriousFace = '😐'
const happyFace = '😊'

export const getFaceSource = (number) => {
    switch (number) {
        case 1: return happyFace
        case 2: return sadFace
        default: return seriousFace
    }
}