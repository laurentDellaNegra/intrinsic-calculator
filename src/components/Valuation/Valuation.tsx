import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'
import Earnings from './Earnings'
import FreeCashFlow from './FreeCashFlow'

interface Props {
  financial: Financial
  company: Company
}

export default function Valuation({ company, financial }: Props) {
  return (
    <>
      <h2 class="mt-8 text-lg font-medium leading-6 text-gray-900">Valuation</h2>
      <Earnings company={company} financial={financial} />
      <FreeCashFlow company={company} financial={financial} />
    </>
  )
}
