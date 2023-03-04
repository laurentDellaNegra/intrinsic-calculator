export function average(array: Array<number>) {
  return array.reduce((acc, num) => acc + num, 0) / array.length
}
