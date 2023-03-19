import HamburgerIcon from '../icons/HamburgerIcon'
import { mobileSideBarOpen } from '../../store/ui/uiStore'

export default function HamburgerButton() {
  return (
    <button
      type="button"
      class="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
      onClick={() => mobileSideBarOpen.set(true)}
    >
      <span class="sr-only">Open sidebar</span>
      <HamburgerIcon />
    </button>
  )
}
