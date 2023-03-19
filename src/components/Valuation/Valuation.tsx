import { createSignal } from 'solid-js'
import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'
import Card from '../ui/Card'

interface Props {
  financial: Financial
  company: Company
}

export default function Valuation({ company, financial }: Props) {
  const [ownEstimation, setOwnEstomation] = createSignal<number>(21)
  const [futurePE, setFuturePE] = createSignal<number>(43)
  const epsTTM = company.epsTtm || financial.table[financial.table.length - 1].eps
  const intrinsic = () => (epsTTM * Math.pow(1 + ownEstimation() / 100, 5) * futurePE()) / 2

  return (
    <>
      <h2 class="mt-8 text-lg font-medium leading-6 text-gray-900">Valuation</h2>
      <Card className="mt-2">
        <div class="flex flex-col items-center justify-between gap-5 p-3 xl:flex-row">
          <div class="flex gap-5">
            <div>
              <label for="estimation" class="block text-sm font-medium leading-6 text-gray-900">
                Own estimation
              </label>
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  type="number"
                  name="estimation"
                  id="estimation"
                  value={ownEstimation()}
                  onInput={(e) => setOwnEstomation(Number(e.currentTarget.value))}
                  class="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  placeholder="21"
                  aria-describedby="estimation-percent"
                />
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span class="text-gray-500 sm:text-sm" id="estimation-percent">
                    %
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label for="future-pe" class="block text-sm font-medium leading-6 text-gray-900">
                Future PE
              </label>
              <div class="mt-2">
                <input
                  type="number"
                  name="future-pe"
                  id="future-pe"
                  value={futurePE()}
                  onInput={(e) => setFuturePE(Number(e.currentTarget.value))}
                  class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <p class="text-sm text-gray-500">
            ({epsTTM} * ((1 + {ownEstimation() / 100}) ^ 5) * {futurePE()}) / 2
          </p>
          <p>
            <span class="font-bold text-gray-900">Intrinsic value: </span>
            <span class="ml-2 text-2xl font-bold text-primary">{intrinsic().toFixed(2)}</span>
          </p>
        </div>
      </Card>
    </>
  )
}
