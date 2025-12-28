// components/site/components/KeywordCards.tsx
import Link from 'next/link'

interface Keyword {
  slug: string
  keyword: string
  priority?: number
}

interface KeywordCardsProps {
  keywords: Keyword[]
  className?: string
}

export function KeywordCards({ keywords, className = "" }: KeywordCardsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {keywords.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="block p-4 bg-white rounded-lg border border-wedding-pink/20 hover:border-wedding-pink/40 hover:shadow-sm transition-all"
        >
          <h4 className="font-medium text-gray-800">{item.keyword}</h4>
        </Link>
      ))}
    </div>
  )
}

