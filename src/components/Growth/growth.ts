import { average, averageCoumpoundGrowthRate } from '../../utils/number'
import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'

// Equity Growth
// EPS Growth
// Cash From AO Growth
// Revenue Growth
// Average Moat Growth

export function createTable(company: Company, financial: Financial) {
  const cols = ['10 Years Avg.', '5 Years Avg.', '3 Years Avg.', '1 Years Avg.']
  const reversedFinancial = financial.table.reverse()
  const equityGrowth1 = averageCoumpoundGrowthRate(
    reversedFinancial[10].equity,
    reversedFinancial[0].equity,
    10
  )
  const equityGrowth2 = averageCoumpoundGrowthRate(
    reversedFinancial[5].equity,
    reversedFinancial[0].equity,
    5
  )
  const equityGrowth3 = averageCoumpoundGrowthRate(
    reversedFinancial[3].equity,
    reversedFinancial[0].equity,
    3
  )
  const equityGrowth4 = averageCoumpoundGrowthRate(
    reversedFinancial[1].equity,
    reversedFinancial[0].equity,
    1
  )
  const equitiesGrowth = [
    { value: equityGrowth1, displayedValue: (equityGrowth1 * 100).toFixed(2) + '%' },
    { value: equityGrowth2, displayedValue: (equityGrowth2 * 100).toFixed(2) + '%' },
    { value: equityGrowth3, displayedValue: (equityGrowth3 * 100).toFixed(2) + '%' },
    { value: equityGrowth4, displayedValue: (equityGrowth4 * 100).toFixed(2) + '%' },
  ]
  const epsGrowth1 = averageCoumpoundGrowthRate(
    reversedFinancial[10].eps,
    reversedFinancial[0].eps,
    10
  )
  const epsGrowth2 = averageCoumpoundGrowthRate(
    reversedFinancial[5].eps,
    reversedFinancial[0].eps,
    5
  )
  const epsGrowth3 = averageCoumpoundGrowthRate(
    reversedFinancial[3].eps,
    reversedFinancial[0].eps,
    3
  )
  const epsGrowth4 = averageCoumpoundGrowthRate(
    reversedFinancial[1].eps,
    reversedFinancial[0].eps,
    1
  )
  const epsGrowth = [
    { value: epsGrowth1, displayedValue: (epsGrowth1 * 100).toFixed(2) + '%' },
    { value: epsGrowth2, displayedValue: (epsGrowth2 * 100).toFixed(2) + '%' },
    { value: epsGrowth3, displayedValue: (epsGrowth3 * 100).toFixed(2) + '%' },
    { value: epsGrowth4, displayedValue: (epsGrowth4 * 100).toFixed(2) + '%' },
  ]
  const cashFromOAGrowth1 = averageCoumpoundGrowthRate(
    reversedFinancial[10].cashFromOA,
    reversedFinancial[0].cashFromOA,
    10
  )
  const cashFromOAGrowth2 = averageCoumpoundGrowthRate(
    reversedFinancial[5].cashFromOA,
    reversedFinancial[0].cashFromOA,
    5
  )
  const cashFromOAGrowth3 = averageCoumpoundGrowthRate(
    reversedFinancial[3].cashFromOA,
    reversedFinancial[0].cashFromOA,
    3
  )
  const cashFromOAGrowth4 = averageCoumpoundGrowthRate(
    reversedFinancial[1].cashFromOA,
    reversedFinancial[0].cashFromOA,
    1
  )
  const cashFromOAGrowth = [
    { value: cashFromOAGrowth1, displayedValue: (cashFromOAGrowth1 * 100).toFixed(2) + '%' },
    { value: cashFromOAGrowth2, displayedValue: (cashFromOAGrowth2 * 100).toFixed(2) + '%' },
    { value: cashFromOAGrowth3, displayedValue: (cashFromOAGrowth3 * 100).toFixed(2) + '%' },
    { value: cashFromOAGrowth4, displayedValue: (cashFromOAGrowth4 * 100).toFixed(2) + '%' },
  ]
  const revenueGrowth1 = averageCoumpoundGrowthRate(
    reversedFinancial[10].revenue,
    reversedFinancial[0].revenue,
    10
  )
  const revenueGrowth2 = averageCoumpoundGrowthRate(
    reversedFinancial[5].revenue,
    reversedFinancial[0].revenue,
    5
  )
  const revenueGrowth3 = averageCoumpoundGrowthRate(
    reversedFinancial[3].revenue,
    reversedFinancial[0].revenue,
    3
  )
  const revenueGrowth4 = averageCoumpoundGrowthRate(
    reversedFinancial[1].revenue,
    reversedFinancial[0].revenue,
    1
  )
  const revenueGrowth = [
    { value: revenueGrowth1, displayedValue: (revenueGrowth1 * 100).toFixed(2) + '%' },
    { value: revenueGrowth2, displayedValue: (revenueGrowth2 * 100).toFixed(2) + '%' },
    { value: revenueGrowth3, displayedValue: (revenueGrowth3 * 100).toFixed(2) + '%' },
    { value: revenueGrowth4, displayedValue: (revenueGrowth4 * 100).toFixed(2) + '%' },
  ]
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
  const averageMoatGrowth = [
    { value: average1, displayedValue: (average1 * 100).toFixed(2) + '%' },
    { value: average2, displayedValue: (average2 * 100).toFixed(2) + '%' },
    { value: average3, displayedValue: (average3 * 100).toFixed(2) + '%' },
    { value: average4, displayedValue: (average4 * 100).toFixed(2) + '%' },
  ]
  console.log(equitiesGrowth)
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
