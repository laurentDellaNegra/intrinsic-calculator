import { average, averageCoumpoundGrowthRate } from '../../utils/number'
import { Company, CompanyTable } from '../../utils/roicAi/company'
import { Financial, FinancialTable } from '../../utils/roicAi/financial'

function getGrowth(reversedFinancial: FinancialTable, key: string) {
  const growth1 = averageCoumpoundGrowthRate(
    reversedFinancial[10][key],
    reversedFinancial[0][key],
    10
  )

  const growth2 = averageCoumpoundGrowthRate(
    reversedFinancial[5][key],
    reversedFinancial[0][key],
    5
  )
  const growth3 = averageCoumpoundGrowthRate(
    reversedFinancial[3][key],
    reversedFinancial[0][key],
    3
  )
  const growth4 = averageCoumpoundGrowthRate(
    reversedFinancial[1][key],
    reversedFinancial[0][key],
    1
  )
  return [
    { value: growth1, displayedValue: (growth1 * 100).toFixed(2) + '%' },
    { value: growth2, displayedValue: (growth2 * 100).toFixed(2) + '%' },
    { value: growth3, displayedValue: (growth3 * 100).toFixed(2) + '%' },
    { value: growth4, displayedValue: (growth4 * 100).toFixed(2) + '%' },
  ]
}

function getGrowthAverage(reversedFinancial: FinancialTable | CompanyTable, key: string) {
  const growth1 = average(reversedFinancial.slice(0, 10).map((r) => r[key]))
  const growth2 = average(reversedFinancial.slice(0, 5).map((r) => r[key]))
  const growth3 = average(reversedFinancial.slice(0, 4).map((r) => r[key]))
  const growth4 = average(reversedFinancial.slice(0, 1).map((r) => r[key]))

  return [
    { value: growth1, displayedValue: growth1.toFixed(2) + '%' },
    { value: growth2, displayedValue: growth2.toFixed(2) + '%' },
    { value: growth3, displayedValue: growth3.toFixed(2) + '%' },
    { value: growth4, displayedValue: growth4.toFixed(2) + '%' },
  ]
}

type GrowthTable = Array<{
  value: number
  displayedValue: string
}>

export function computeAverage(
  equitiesGrowth: GrowthTable,
  epsGrowth: GrowthTable,
  cashFromOAGrowth: GrowthTable,
  revenueGrowth: GrowthTable
) {
  const average1 = average([
    equitiesGrowth[0].value,
    epsGrowth[0].value,
    cashFromOAGrowth[0].value,
    revenueGrowth[0].value,
  ])
  const average2 = average([
    equitiesGrowth[1].value,
    epsGrowth[1].value,
    cashFromOAGrowth[1].value,
    revenueGrowth[1].value,
  ])
  const average3 = average([
    equitiesGrowth[2].value,
    epsGrowth[2].value,
    cashFromOAGrowth[2].value,
    revenueGrowth[2].value,
  ])
  const average4 = average([
    equitiesGrowth[3].value,
    epsGrowth[3].value,
    cashFromOAGrowth[3].value,
    revenueGrowth[3].value,
  ])
  return [
    { value: average1, displayedValue: (average1 * 100).toFixed(2) + '%' },
    { value: average2, displayedValue: (average2 * 100).toFixed(2) + '%' },
    { value: average3, displayedValue: (average3 * 100).toFixed(2) + '%' },
    { value: average4, displayedValue: (average4 * 100).toFixed(2) + '%' },
  ]
}

export function createLeftTable(financial: Financial) {
  const cols = ['10 Years Avg.', '5 Years Avg.', '3 Years Avg.', '1 Years Avg.']
  const reversedFinancialTable = [...financial.table].reverse()

  const equitiesGrowth = getGrowth(reversedFinancialTable, 'equity')
  const epsGrowth = getGrowth(reversedFinancialTable, 'eps')
  const cashFromOAGrowth = getGrowth(reversedFinancialTable, 'cashFromOA')
  const revenueGrowth = getGrowth(reversedFinancialTable, 'revenue')

  const averageMoatGrowth = computeAverage(
    equitiesGrowth,
    epsGrowth,
    cashFromOAGrowth,
    revenueGrowth
  )

  return {
    cols,
    rowsArray: [
      { id: 'equity', label: 'Equity Growth' },
      { id: 'eps', label: 'EPS Growth' },
      { id: 'cashFromOA', label: 'Cash From AO Growth' },
      { id: 'revenue', label: 'Revenue Growth' },
      { id: 'averageMoat', label: 'Average Moat Growth' },
    ],
    rows: {
      equity: equitiesGrowth,
      eps: epsGrowth,
      cashFromOA: cashFromOAGrowth,
      revenue: revenueGrowth,
      averageMoat: averageMoatGrowth,
    },
  }
}

export function createRightTable(financial: Financial, company: Company) {
  const cols = ['10 Years Avg.', '5 Years Avg.', '3 Years Avg.', '1 Years Avg.']
  const reversedCompanyTable = [...company.table].reverse()
  const reversedFinancialTable = [...financial.table].reverse()

  const roeGrowth = getGrowthAverage(reversedCompanyTable, 'roe')
  const roicGrowth = getGrowthAverage(reversedCompanyTable, 'roic')
  const shareDillutionGrowth = getGrowth(reversedFinancialTable, 'sharesOuts')
  return {
    cols,
    rowsArray: [
      { id: 'roe', label: 'ROE Growth' },
      { id: 'roic', label: 'ROIC Growth' },
      { id: 'shareOuts', label: 'Share dilution' },
    ],
    rows: {
      roe: roeGrowth,
      roic: roicGrowth,
      shareOuts: shareDillutionGrowth,
    },
  }
}
