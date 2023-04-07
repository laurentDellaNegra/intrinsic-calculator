import { For, createSignal } from 'solid-js'
import { average } from '../../utils/number'
import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'
import Card from '../ui/Card'
import ToggleButton from '../ui/ToggleButton'

interface Props {
  financial: Financial
  company: Company
}

export default function FreeCashFlow({ company, financial }: Props) {
  // TODO: find TTM fcf
  // const fcf = average(financial.table.slice(-3).map((t) => t.fcf))
  const fcf = 89.5
  const lastSharesOuts = financial.table.slice(-1)[0].sharesOuts
  const lastEquity = financial.table.slice(-1)[0].equity
  const [ownEstimation, setOwnEstomation] = createSignal<number>(17.5)
  const projections = () => {
    const projs = [fcf + fcf * (ownEstimation() / 100)]
    for (let i = 1; i < 8; i++) {
      projs.push(projs[i - 1] + projs[i - 1] * (ownEstimation() / 100))
    }
    return projs
  }
  const intrinsic = () =>
    (projections().reduce((prev, current) => (prev += current), 0) + lastEquity) / lastSharesOuts
  return (
    <>
      <h2 class="mt-3 text-sm font-medium leading-6 text-gray-500">Free cash flow</h2>
      <Card className="mt-2 inline-flex">
        <div class="flex flex-col items-center gap-12 p-3 xl:flex-row">
          <div class="flex gap-8">
            <div class="flex gap-12">
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
                  <label for="estimation" class="block text-sm font-medium leading-6 text-gray-900">
                    FCF 3 Years Avg.
                  </label>
                  <div class="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="number"
                      name="estimation"
                      id="estimation"
                      value={fcf.toFixed(2)}
                      disabled
                      class="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                      aria-describedby="estimation-percent"
                    />
                  </div>
                </div>
              </div>
              <div class="mt-2 text-sm text-gray-500">
                <ul class="border-b-2">
                  <For each={projections()}>
                    {(projection, index) => (
                      <li>
                        Year {index() + 1}: {projection.toFixed(2)}
                      </li>
                    )}
                  </For>
                  <li>Last Equity: {lastEquity}</li>
                </ul>
                Last shares outstanding: {lastSharesOuts}
              </div>
              <p class="place-self-center">
                <span class="font-bold text-gray-900">=</span>
              </p>
              <p class="place-self-center">
                <span class="ml-2 text-2xl font-bold text-primary">${intrinsic().toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
