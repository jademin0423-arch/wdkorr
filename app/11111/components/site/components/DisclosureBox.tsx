// components/site/components/DisclosureBox.tsx
'use client'

import { useState } from 'react'

interface DisclosureBoxProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function DisclosureBox({ title, children, defaultOpen = false }: DisclosureBoxProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border border-wedding-pink/30 rounded-lg bg-wedding-ivory/50 my-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 text-left font-medium text-gray-800 flex items-center justify-between"
        aria-expanded={isOpen}
        aria-controls="disclosure-content"
      >
        <span>{title}</span>
        <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </button>
      <div
        id="disclosure-content"
        className={`px-4 pb-4 text-gray-700 text-sm ${isOpen ? 'block' : 'hidden'}`}
      >
        {children}
      </div>
    </div>
  )
}

