import { CheerioAPI } from 'cheerio'
import { convertStringToNumber } from './number'

export function getRowNumbersInTable($: CheerioAPI, rowName: string) {
  const arr: Array<number | null> = []
  $(`span:contains("${rowName}")`)
    .first()
    .parent('div')
    .parent()
    .children()
    .last()
    .contents()
    .each(function (i) {
      const textConverted = convertStringToNumber($(this).text())
      arr[i] = isNaN(textConverted) ? null : textConverted
    })
  return arr
}

export function getTtmInQuarterTable($: CheerioAPI, tableName: string) {
  const textConverted = convertStringToNumber(
    $(`div:contains("${tableName}")`)
      .parent('div')
      .parent()
      .parent()
      .children()
      .last()
      .find('.pl-1,.font-normal')
      .last()
      .text()
  )
  return isNaN(textConverted) ? null : textConverted
}
