import { CheerioAPI } from 'cheerio'
import { convertStringToNumber, numberFormatter } from './number'

export function getRowNumbersInTable($: CheerioAPI, rowName: string) {
  const arr = []
  $(`span:contains("${rowName}")`)
    .first()
    .parent('div')
    .parent()
    .children()
    .last()
    .contents()
    .each(function (i) {
      arr[i] = convertStringToNumber($(this).text())
    })
  return arr.filter((a) => !isNaN(a))
}

export function getTtmInQuarterTable($: CheerioAPI, tableName: string) {
  return convertStringToNumber(
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
}
