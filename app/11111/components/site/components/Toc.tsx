// components/site/components/Toc.tsx
'use client'

import { useState } from 'react'

interface TocProps {
  headings: Array<{ id: string; text: string; level: number }>
}

export function Toc({ headings }: TocProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (headings.length === 0) return null

  return (
    <nav className="mb-8" aria-label="목차">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:w-auto px-4 py-3 bg-wedding-ivory border border-wedding-pink/30 rounded-lg text-left font-medium text-gray-800 flex items-center justify-between md:justify-start gap-2"
        aria-expanded={isOpen}
        aria-controls="toc-list"
      >
        <span>목차</span>
        <span className="md:hidden">{isOpen ? '▲' : '▼'}</span>
      </button>
      <ul
        id="toc-list"
        className={`mt-2 space-y-2 ${isOpen ? 'block' : 'hidden md:block'}`}
      >
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${(heading.level - 2) * 4}`}>
            <a
              href={`#${heading.id}`}
              className="text-gray-700 hover:text-wedding-pink transition-colors text-sm"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

