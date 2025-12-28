// components/site/components/Faq.tsx
'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface FaqProps {
  items: FaqItem[]
}

export function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">자주 묻는 질문</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-wedding-pink/30 rounded-lg bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-4 py-3 text-left font-medium text-gray-800 flex items-center justify-between"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{item.question}</span>
              <span className="text-gray-500">{openIndex === index ? '▲' : '▼'}</span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`px-4 pb-4 text-gray-700 text-sm ${openIndex === index ? 'block' : 'hidden'}`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

