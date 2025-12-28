// components/site/components/Byline.tsx
import { SITE } from '@/lib/site'

interface BylineProps {
  lastUpdated?: string
}

export function Byline({ lastUpdated }: BylineProps) {
  const date = lastUpdated || SITE.editorial.lastUpdatedDefault

  return (
    <div className="mt-8 pt-6 border-t border-wedding-pink/30 text-sm text-gray-600">
      <div className="space-y-1">
        <p>
          <span className="font-medium">작성자:</span> {SITE.editorial.authorName}
        </p>
        <p>
          <span className="font-medium">검토자:</span> {SITE.editorial.reviewerName}
        </p>
        <p>
          <span className="font-medium">마지막 업데이트:</span> {date}
        </p>
      </div>
    </div>
  )
}

