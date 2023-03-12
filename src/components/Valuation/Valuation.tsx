import { createSignal } from 'solid-js'
import { Company } from '../../utils/roicAi/company'
import { Financial } from '../../utils/roicAi/financial'

interface Props {
  financial: Financial
  company: Company
}

export default function Valuation({ company, financial }: Props) {
  const [ownEstimation, setOwnEstomation] = createSignal<number>(0.21)
  const [futurePE, setFuturePE] = createSignal<number>(43)
  const epsTTM = company.epsTtm || financial.table[financial.table.length - 1].eps
  const intrinsic = () => (epsTTM * Math.pow(1 + ownEstimation(), 5) * futurePE()) / 2

  return (
    <div class="flex flex-col">
      <div class="flex gap-5">
        <div class="">
          <label for="estimation" class="block text-sm font-medium leading-6">
            Own estimation
          </label>
          <div class="mt-2">
            <input
              type="number"
              name="estimation"
              id="estimation"
              value={ownEstimation()}
              onInput={(e) => setOwnEstomation(Number(e.currentTarget.value))}
              class="block w-full rounded-md border-0 bg-background-light px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="">
          <label for="future-pe" class="block text-sm font-medium leading-6">
            Future PE
          </label>
          <div class="mt-2">
            <input
              type="number"
              name="future-pe"
              id="future-pe"
              value={futurePE()}
              onInput={(e) => setFuturePE(Number(e.currentTarget.value))}
              class="block w-full rounded-md border-0 bg-background-light px-4 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      <p class="mt-5 text-center text-2xl font-bold">
        ({epsTTM} * ((1 + {ownEstimation()}) ^ 5) * {futurePE()}) / 2
      </p>
      <p class="mt-5 text-center text-2xl font-bold">Valuation: {intrinsic().toFixed(2)}</p>
    </div>
  )
}
