import { CheerioAPI, load } from 'cheerio'
import { getRowNumbersInTable, getTtmInQuarterTable } from '../../utils/roicAi'

export function getCompany(rawHtml: string) {
  const $ = load(rawHtml)
  const arrayYears = getYears($)
  const arrayRoe = getRoe($)
  const arrayRoic = getRoic($)
  const epsTtm = getEpsTtm($)
  return {
    epsTtm,
    table: arrayYears.map((year, i) => ({
      year: year,
      roe: arrayRoe[i],
      roic: arrayRoic[i],
    })),
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
