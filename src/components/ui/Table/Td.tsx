import { JSX } from 'solid-js/jsx-runtime'

interface Props {
  children?: JSX.Element
}

export default function Td({ children }: Props) {
  return <td class="whitespace-nowrap px-3 py-3 text-xs text-gray-900">{children}</td>
}
