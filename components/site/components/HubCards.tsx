// components/site/components/HubCards.tsx
import Link from 'next/link'
import hubsData from '@/data/hubs.json'

export function HubCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {hubsData.map((hub) => (
        <Link
          key={hub.hubSlug}
          href={`/hub/${hub.hubSlug}`}
          className="block p-6 bg-white rounded-lg border border-wedding-pink/20 hover:border-wedding-pink/40 hover:shadow-md transition-all"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{hub.hubTitle}</h3>
          <p className="text-gray-600 text-sm">{hub.hubKeyword}</p>
          <p className="text-gray-500 text-xs mt-2">{hub.keywords.length}개 키워드</p>
        </Link>
      ))}
    </div>
  )
}

