import { Accessor, JSXElement } from 'solid-js'

interface Props {
  enabled: Accessor<boolean>
  onChange: (newValue: boolean) => void
  children: JSXElement
}

export default function ToggleButton({ enabled, onChange, children }: Props) {
  return (
    <div class="flex items-center">
      {/* <!-- Enabled: "bg-orange-400", Not Enabled: "bg-gray-200" --> */}
      <button
        type="button"
        class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        classList={{ 'bg-orange-400': enabled(), 'bg-orange-200': !enabled() }}
        role="switch"
        aria-checked="false"
        onClick={() => onChange(!enabled())}
      >
        {/* <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" --> */}
        <span
          aria-hidden="true"
          class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          classList={{ 'translate-x-5': enabled(), 'translate-x-0': !enabled() }}
        ></span>
      </button>
      {children}
    </div>
  )
}
