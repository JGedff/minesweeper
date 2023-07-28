export const numberToText = (number, uncover) => {
  let numberTexted

  if (uncover) {
    switch (number) {
      case 1: numberTexted = ' one'; break
      case 2: numberTexted = ' two'; break
      case 3: numberTexted = ' three'; break
      case 4: numberTexted = ' four'; break
      case 5: numberTexted = ' five'; break
      case 6: numberTexted = ' six'; break
      case 7: numberTexted = ' seven'; break
      case 8: numberTexted = ' eight'; break
      default: numberTexted = ''; break
    }
  } else {
    numberTexted = ' cover'
  }

  return numberTexted
}
