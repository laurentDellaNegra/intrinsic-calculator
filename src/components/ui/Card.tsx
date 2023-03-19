export default function Card({ className = '', children }) {
  return (
    <div class={`overflow-hidden overflow-x-auto rounded-lg bg-white shadow ${className}`}>
      {children}
    </div>
  )
}
