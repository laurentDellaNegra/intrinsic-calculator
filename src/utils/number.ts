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

export function average(array: Array<number>) {
  return array.reduce((acc, num) => acc + num, 0) / array.length
}

export function averageCoumpoundGrowthRate(start: number, end: number, nbYear: number) {
  if (start === -1.28) {
    console.log('start', start)
    console.log('end', end)
    console.log('nbYear', nbYear)
    console.log('pow', Math.pow(end / Math.abs(start), 1 / nbYear) - 1)
  }
  return Math.pow(end / Math.abs(start), 1 / nbYear) - 1
}
