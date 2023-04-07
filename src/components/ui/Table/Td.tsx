import { JSX } from 'solid-js/jsx-runtime'

interface Props {
  children?: JSX.Element
}

export default function Td({ children }: Props) {
  return (
    <td class="whitespace-nowrap px-3 py-3 text-xs text-gray-900 first:sticky first:left-0 first:z-10 first:bg-white first:drop-shadow-xl">
      {children}
    </td>
  )
}
