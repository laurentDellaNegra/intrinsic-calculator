import { CheerioAPI, load } from 'cheerio'
import { getRowNumbersInTable } from '../../utils/roicAi/roicAi'

export interface Financial {
  table: Array<{
    year: number
    equity: number
    eps: number
    cashFromOA: number
    revenue: number
    capex: number
    fcf: number
  }>
}

export function getFinancial(rawHtml: string): Financial {
  const $ = load(rawHtml)

  const arrayYears = getYears($)
  const arrayEquities = getEquities($)
  const arrayEPS = getEps($)
  const arrayCashFromOA = getCashFromOA($)
  const arrayCapex = getCapex($)
  const arrayRevenues = getRevenues($)
  const arrayFcf = getFcf($)

  // create the final Table
  return {
    table: arrayYears.map((year, i) => ({
      year: year,
      equity: arrayEquities[i],
      eps: arrayEPS[i],
      cashFromOA: arrayCashFromOA[i],
      revenue: arrayRevenues[i],
      capex: arrayCapex[i],
      fcf: arrayFcf[i],
    })),
  }
}

function getYears($: CheerioAPI) {
  const res = getRowNumbersInTable($, 'Currency: USD, in millions')
  res.pop()
  return res
}

function getEquities($: CheerioAPI) {
  return getRowNumbersInTable($, 'Total Stockholders Equity')
}

function getEps($: CheerioAPI) {
  return getRowNumbersInTable($, 'EPS Diluted')
}

function getCashFromOA($: CheerioAPI) {
  return getRowNumbersInTable($, 'Cash Provided by Operating Activities')
}

function getRevenues($: CheerioAPI) {
  return getRowNumbersInTable($, 'Revenue')
}

function getCapex($: CheerioAPI) {
  return getRowNumbersInTable($, 'CAPEX')
}

function getFcf($: CheerioAPI) {
  return getRowNumbersInTable($, 'Free Cash Flow')
}