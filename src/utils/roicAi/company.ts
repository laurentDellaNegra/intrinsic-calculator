import { CheerioAPI, load } from 'cheerio'
import { getRowNumbersInTable, getTtmInQuarterTable } from './roicAi'

export interface Company {
  epsTtm: number
  table: Array<{
    year: number
    roe: number
    roic: number
  }>
}

export function getCompany(rawHtml: string): Company {
  const $ = load(rawHtml)
  const arrayYears = getYears($)
  const arrayRoe = getRoe($)
  const arrayRoic = getRoic($)
  const epsTtm = getEpsTtm($)
  return {
    epsTtm,
    table: arrayYears
      .map((year, i) => ({
        year: year,
        roe: arrayRoe[i],
        roic: arrayRoic[i],
      }))
      .filter((t) => t.year !== null),
  }
}

function getYears($: CheerioAPI) {
  return getRowNumbersInTable($, 'Currency: USD')
}

function getRoe($: CheerioAPI) {
  return getRowNumbersInTable($, 'Return on equity')
}

function getRoic($: CheerioAPI) {
  return getRowNumbersInTable($, 'ROIC')
}

function getEpsTtm($: CheerioAPI) {
  return getTtmInQuarterTable($, 'Earnings per share')
}
