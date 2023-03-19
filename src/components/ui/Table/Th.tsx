import { JSX } from 'solid-js/jsx-runtime'

interface Props {
  children?: JSX.Element
}

export default function Th({ children }: Props) {
  return (
    <th
      scope="col"
      class="whitespace-nowrap bg-gray-50 px-3 py-4 text-left text-xs font-semibold text-gray-900"
    >
      {children}
    </th>
  )
}
