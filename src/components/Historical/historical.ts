import { average } from '../../utils/number'
import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'

export type HistoricalTableCell = {
  col: string | number
  row: string
  value: number
  displayedValue: string | number
}

export type HistoricalTable = {
  year: Array<number | string>
  equity: Array<HistoricalTableCell>
  eps: Array<HistoricalTableCell>
  cashFromOa: Array<HistoricalTableCell>
  revenue: Array<HistoricalTableCell>
  roe: Array<HistoricalTableCell>
  roic: Array<HistoricalTableCell>
  capex: Array<HistoricalTableCell>
  fcf: Array<HistoricalTableCell>
}

export function createTable(company: Company, financial: Financial) {
  const year = [...financial.table.map((f) => f.year), 'TTM', '3 Years Avg.']
  const table: HistoricalTable = {
    year,
    equity: financial.table.map((f) => ({
      col: f.year,
      row: 'Equity',
      value: f.equity,
      displayedValue: f.equity ?? '',
    })),
    eps: financial.table.map((f) => ({
      col: f.year,
      row: 'EPS',
      value: f.eps,
      displayedValue: f.eps ?? '',
    })),
    cashFromOa: financial.table.map((f) => ({
      col: f.year,
      row: 'Cash from OA',
      value: f.cashFromOA,
      displayedValue: f.cashFromOA ?? '',
    })),
    revenue: financial.table.map((f) => ({
      col: f.year,
      row: 'Revenue',
      value: f.revenue,
      displayedValue: f.revenue ?? '',
    })),
    roe: financial.table.map((f) => {
      const foundCompanyYear = company.table.find((c) => c.year === f.year)
      return {
        col: f.year,
        row: 'ROE',
        value: foundCompanyYear?.roe ?? null,
        displayedValue: foundCompanyYear?.roe ?? '',
      }
    }),
    roic: financial.table.map((f) => {
      const foundCompanyYear = company.table.find((c) => c.year === f.year)
      return {
        col: f.year,
        row: 'ROIC',
        value: foundCompanyYear?.roic ?? null,
        displayedValue: foundCompanyYear?.roic ?? '',
      }
    }),
    capex: financial.table.map((f) => ({
      col: f.year,
      row: 'CAPEX',
      value: f.capex,
      displayedValue: f.capex ?? '',
    })),
    fcf: financial.table.map((f) => ({
      col: f.year,
      row: 'FCF',
      value: f.fcf,
      displayedValue: f.fcf ?? '',
    })),
  }
  // TTM:
  table.eps.push({
    col: 'TTM',
    row: 'EPS',
    value: company.epsTtm,
    displayedValue: company.epsTtm,
  })
  table.fcf.push({
    col: 'TTM',
    row: 'FCF',
    value: null,
    displayedValue: 'TOFIND',
  })
  // 3 years avg
  table.eps.push({
    col: '3 Years Avg.',
    row: 'EPS',
    value: average(financial.table.slice(-3).map((t) => t.eps)),
    displayedValue: average(financial.table.slice(-3).map((t) => t.eps)).toFixed(2),
  })
  table.fcf.push({
    col: '3 Years Avg.',
    row: 'FCF',
    value: average(financial.table.slice(-3).map((t) => t.fcf)),
    displayedValue: average(financial.table.slice(-3).map((t) => t.fcf)).toFixed(2),
  })
  return table
}

export function getRows(table: HistoricalTable) {
  const keys = Object.keys(table).filter((key) => key !== 'year')
  return keys.map((key) => ({ key, label: table[key][0].row }))
}
