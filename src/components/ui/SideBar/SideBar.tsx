import { useStore } from '@nanostores/solid'
import { mobileSideBarOpen } from '../../../store/ui/uiStore'
import CalculatorIcon from '../../icons/CalculatorIcon'
import CrossIcon from '../../icons/CrossIcon'

export default function SideBar() {
  const $mobileSideBarOpen = useStore(mobileSideBarOpen)
  return (
    <>
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
        <div
          class="fixed bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear"
          classList={{
            'opacity-100 inset-0': $mobileSideBarOpen(),
            'opacity-0': !$mobileSideBarOpen(),
          }}
        ></div>

        <div
          class="fixed z-40 flex"
          classList={{
            'inset-0': $mobileSideBarOpen(),
            'w-0 h-0': !$mobileSideBarOpen(),
          }}
        >
          <div
            class="relative flex w-full max-w-xs flex-1 transform flex-col bg-astro-700 pt-5 pb-4 transition duration-300 ease-in-out"
            classList={{
              'translate-x-0': $mobileSideBarOpen(),
              '-translate-x-full': !$mobileSideBarOpen(),
            }}
          >
            <div
              class="absolute top-0 right-0 -mr-12 pt-2 duration-300 ease-in-out"
              classList={{
                'opacity-100': $mobileSideBarOpen(),
                'opacity-0': !$mobileSideBarOpen(),
              }}
            >
              <button
                type="button"
                class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => mobileSideBarOpen.set(!$mobileSideBarOpen())}
              >
                <span class="sr-only">Close sidebar</span>
                <CrossIcon />
              </button>
            </div>

            <div class="flex flex-shrink-0 items-center justify-center px-4">
              <img class="h-16 w-auto" src="favicon.svg" alt="Easywire logo" />
            </div>
            <nav
              class="mt-5 h-full flex-shrink-0 divide-y divide-astro-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div class="space-y-1 px-2">
                {/* <!-- Current: "bg-astro-800 text-white", Default: "text-astro-100 hover:bg-astro-600 hover:text-white" --> */}
                <a
                  href="/"
                  class="group flex items-center rounded-md bg-astro-800 px-2 py-2 text-base font-medium text-white"
                  aria-current="page"
                >
                  <CalculatorIcon />
                  Calculator
                </a>
              </div>
            </nav>
          </div>

          <div class="w-14 flex-shrink-0" aria-hidden="true">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div class="flex flex-grow flex-col overflow-y-auto bg-astro-700 pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center justify-center px-4">
            <img class="h-16 w-auto" src="favicon.svg" alt="Easywire logo" />
          </div>
          <nav
            class="mt-5 flex flex-1 flex-col divide-y divide-astro-800 overflow-y-auto"
            aria-label="Sidebar"
          >
            <div class="space-y-1 px-2">
              <a
                href="/"
                class="group flex items-center rounded-md bg-astro-800 px-2 py-2 text-sm font-medium leading-6 text-white"
                aria-current="page"
              >
                <CalculatorIcon />
                Calculator
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
