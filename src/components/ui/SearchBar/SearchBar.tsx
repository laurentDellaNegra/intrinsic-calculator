import { createSignal } from 'solid-js'
import LoopIcon from '../../icons/LoopIcon'

export default function SearchBar() {
  const [text, setText] = createSignal('')

  const handleFormSubmit = (event) => {
    event.preventDefault()
    window.location.pathname = `/${text()}`
  }
  return (
    <div class="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
      <div class="flex flex-1">
        <form class="flex w-full md:ml-0" onsubmit={handleFormSubmit}>
          <label for="search-field" class="sr-only">
            Search a ticker
          </label>
          <div class="relative w-full text-gray-400 focus-within:text-gray-600">
            <div
              class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              aria-hidden="true"
            >
              <LoopIcon />
            </div>
            <input
              id="search-field"
              name="search-field"
              class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              placeholder="Search a ticker"
              type="search"
              value={text()}
              oninput={(e) => setText(e.currentTarget.value)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
