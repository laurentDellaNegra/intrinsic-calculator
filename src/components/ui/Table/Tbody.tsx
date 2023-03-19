import { JSX } from 'solid-js/jsx-runtime'

interface Props {
  children?: JSX.Element
}

export default function Tbody({ children }: Props) {
  return <tbody class="divide-y divide-gray-200 bg-white">{children}</tbody>
}
