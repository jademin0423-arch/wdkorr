// components/site/components/ChecklistBox.tsx
interface ChecklistBoxProps {
  title: string
  items: string[]
}

export function ChecklistBox({ title, items }: ChecklistBoxProps) {
  return (
    <div className="bg-wedding-ivory border border-wedding-pink/30 rounded-lg p-6 my-6">
      <h3 className="font-semibold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-700">
            <span className="text-wedding-pink mt-1">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

