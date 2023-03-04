export function numberFormatter(numberStr: string) {
  return parseFloat(numberStr.replace(',', ''))
}

export function toNumber(number: number) {
  return new Intl.NumberFormat('fr-FR').format(number)
}

export function convertStringToNumber(str: string) {
  const charToRemove = /\(|\)/g
  let numStr = str
  let isNegative = false
  if (numStr.includes('(') && numStr.includes(')')) {
    isNegative = true
    numStr = numStr.replace(new RegExp(charToRemove, 'g'), '')
  }
  return isNegative ? numberFormatter(numStr) * -1 : numberFormatter(numStr)
}
