import { createSignal } from 'solid-js'
import { average } from '../../utils/number'
import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'
import Card from '../ui/Card'
import ToggleButton from '../ui/ToggleButton'

interface Props {
  financial: Financial
  company: Company
}

// 0% => 8 - 10
// 2.5% => 9 - 11
// 5% => 10 - 13
// 7.5% => 10 - 14
// 10% => 11 - 16
// 12.5% => 13 - 18
// 15% => 14 - 20
// 17.5% => 15 - 23
// 20% => 16 - 26
// 22.5% => 18 - 29
// 25% => 20 - 33
// 27.5% => 22 - 38
// 30% => 24 - 43
function getInitialFuturePE(growthRate: number) {
  if (growthRate >= 30) return 33
  if (growthRate >= 27.5) return 30
  if (growthRate >= 25) return 26
  if (growthRate >= 22.5) return 24
  if (growthRate >= 20) return 20
  if (growthRate >= 17.5) return 19
  if (growthRate >= 15) return 17
  if (growthRate >= 12.5) return 15
  if (growthRate >= 10) return 13
  if (growthRate >= 7.5) return 12
  if (growthRate >= 5) return 11
  if (growthRate >= 2.5) return 10
  return 9
}

export default function Earnings({ company, financial }: Props) {
  const [ownEstimation, setOwnEstomation] = createSignal<number>(17.5)
  const [futurePE, setFuturePE] = createSignal<number>(getInitialFuturePE(ownEstimation()))
  const [desiredReturn, setDesiredReturn] = createSignal<number>(15)
  const [useTTM, setUseTTM] = createSignal<boolean>(true)
  const epsTTM = company.epsTtm
  const eps3Years = average(financial.table.slice(-3).map((t) => t.eps))
  const eps = () => (useTTM() ? epsTTM : eps3Years)
  const intrinsic = () =>
    (eps() * Math.pow(1 + ownEstimation() / 100, 5) * futurePE()) /
    ((13.33 * desiredReturn()) / 100)

  return (
    <>
      <h2 class="mt-3 text-sm font-medium leading-6 text-gray-500">Earnings</h2>
      <Card className="mt-2 inline-flex">
        <div class="flex flex-col items-center gap-12 p-3 xl:flex-row">
          <div class="flex gap-8">
            <div class="flex flex-col gap-4">
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
            <div class="flex flex-col justify-between gap-5 pb-2">
              <div>
                <label
                  for="desired-return"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Desired return
                </label>
                <div class="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="number"
                    name="desired-return"
                    id="desired-return"
                    value={desiredReturn()}
                    onInput={(e) => setDesiredReturn(Number(e.currentTarget.value))}
                    class="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                    placeholder="21"
                    aria-describedby="desired-return-percent"
                  />
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span class="text-gray-500 sm:text-sm" id="desired-return-percent">
                      %
                    </span>
                  </div>
                </div>
              </div>
              <ToggleButton enabled={useTTM} onChange={setUseTTM}>
                <span class="ml-3 text-sm" id="annual-billing-label">
                  <span class="font-medium text-gray-900">
                    Use {useTTM() ? 'TTM' : '3 Years Avg.'}
                  </span>
                </span>
              </ToggleButton>
            </div>
          </div>

          <p class="text-sm text-gray-500">
            ({eps().toFixed(2)} * ((1 + {ownEstimation() / 100}) ^ 5) * {futurePE()}) /{' '}
            {((13.33 * desiredReturn()) / 100).toFixed(2)}
          </p>
          <p>
            <span class="font-bold text-gray-900">=</span>
          </p>
          <p>
            <span class="ml-2 text-2xl font-bold text-primary">${intrinsic().toFixed(2)}</span>
          </p>
        </div>
      </Card>
    </>
  )
}
