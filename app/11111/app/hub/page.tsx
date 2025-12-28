// app/hub/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { HubCards } from '@/components/site/components/HubCards'
import { Byline } from '@/components/site/components/Byline'
import hubsData from '@/data/hubs.json'

export const metadata = generateSeoMetadata({
  title: "웨딩박람회 허브",
  description: "전국 지역별 웨딩박람회 허브 페이지입니다. 수도권, 충청권, 영남권, 호남권, 강원권, 제주, 일정·후기·유형별로 정보를 확인하세요.",
  path: "/hub",
  keywords: ["웨딩박람회", "지역별 웨딩박람회", "웨딩박람회 허브"]
})

export default function HubIndexPage() {
  const jsonLd = generateJsonLd({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: '허브', item: `${SITE.domain}hub` }
      ]
    }
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-wedding-pink">홈</Link></li>
            <li>/</li>
            <li className="text-gray-800">허브</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          웨딩박람회 허브
        </h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <p className="text-lg mb-4">
            전국을 7개 권역으로 나누어 각 지역의 웨딩박람회 정보를 제공합니다. 관심 있는 지역을 선택하여 상세 정보를 확인하세요.
          </p>
          <p className="mb-4">
            각 허브 페이지에서는 해당 지역의 모든 웨딩박람회 정보와 후기, 추천 정보를 한눈에 확인할 수 있습니다.
          </p>
        </div>

        <div className="mb-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-wedding-pink text-white rounded-lg hover:bg-wedding-pink/90 transition-colors font-medium"
          >
            ← 전국 종합 가이드로 돌아가기
          </Link>
        </div>

        <HubCards />

        <Byline />
      </div>
    </>
  )
}

