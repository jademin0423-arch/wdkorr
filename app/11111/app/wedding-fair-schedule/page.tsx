// app/wedding-fair-schedule/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { ChecklistBox } from '@/components/site/components/ChecklistBox'
import { DisclosureBox } from '@/components/site/components/DisclosureBox'
import { Byline } from '@/components/site/components/Byline'
import { KeywordCards } from '@/components/site/components/KeywordCards'
import hubsData from '@/data/hubs.json'
import keywordsData from '@/data/keywords.json'

export const metadata = generateSeoMetadata({
  title: "웨딩박람회 일정",
  description: "2026년 전국 웨딩박람회 일정을 지역별, 월별로 확인하세요. 웨딩박람회 찾는 법, 준비물, 체크리스트를 제공합니다.",
  path: "/wedding-fair-schedule",
  keywords: ["웨딩박람회일정", "2025 웨딩박람회 일정", "2026 웨딩박람회 일정", "웨딩박람회"]
})

export default function WeddingFairSchedulePage() {
  const scheduleKeywords = keywordsData
    .filter(k => k.hubSlug === 'schedule-review-type' || k.slug.includes('schedule'))
    .slice(0, 6)
    .map(k => ({ slug: k.slug, keyword: k.keyword }))

  const relatedHubs = hubsData.slice(0, 3).map(hub => ({
    slug: hub.hubSlug,
    title: hub.hubTitle
  }))

  const checklistItems = [
    "웨딩박람회 일정 사전 확인",
    "박람회 장소 및 교통편 확인",
    "초대권 또는 사전 등록 완료",
    "결혼 예정일 및 예산 정리",
    "관심 업체 리스트 작성",
    "질문 사항 정리"
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateJsonLd({
        type: 'BreadcrumbList',
        data: {
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
            { '@type': 'ListItem', position: 2, name: '웨딩박람회 일정', item: `${SITE.domain}wedding-fair-schedule` }
          ]
        }
      }),
      generateJsonLd({
        type: 'WebPage',
        data: {
          name: '웨딩박람회 일정',
          description: '2026년 전국 웨딩박람회 일정 가이드',
          url: `${SITE.domain}wedding-fair-schedule`
        }
      })
    ]
  }

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
            <li className="text-gray-800">웨딩박람회 일정</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          웨딩박람회 일정 총정리
        </h1>

        <div className="mb-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-wedding-pink text-white rounded-lg hover:bg-wedding-pink/90 transition-colors font-medium mb-6"
          >
            ← 전국 종합 가이드로 돌아가기
          </Link>
        </div>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <p className="text-lg mb-4">
            웨딩박람회 일정을 효율적으로 찾고 준비하는 방법을 안내합니다. 전국 각 지역의 웨딩박람회는 보통 봄(3-5월)과 가을(9-11월)에 집중적으로 개최됩니다.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">웨딩박람회 찾는 법</h2>
          <p className="mb-4">
            웨딩박람회 일정은 각 지역별 허브 페이지에서 확인할 수 있습니다. 수도권, 충청권, 영남권, 호남권, 강원권, 제주 등 지역별로 정리된 정보를 제공합니다.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">지역별 웨딩박람회</h2>
          <p className="mb-4">
            각 지역의 주요 웨딩박람회는 다음과 같이 구분됩니다:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>수도권: 서울, 경기도 각 지역의 대형 박람회</li>
            <li>충청권: 청주, 대전, 천안아산 지역 박람회</li>
            <li>영남권: 부산, 창원, 김해, 진주, 울산 지역 박람회</li>
            <li>호남권: 광주, 순천, 여수, 군산 지역 박람회</li>
            <li>강원권: 강릉, 속초, 원주 지역 박람회</li>
            <li>제주: 제주 지역 박람회</li>
          </ul>
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">준비물 및 체크리스트</h2>
          <p className="mb-4">
            웨딩박람회에 참석하기 전에 미리 준비하면 더 효율적으로 정보를 수집할 수 있습니다.
          </p>
        </div>

        <ChecklistBox title="웨딩박람회 준비 체크리스트" items={checklistItems} />

        <section className="my-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">관련 지역 허브</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedHubs.map((hub) => (
              <Link
                key={hub.slug}
                href={`/hub/${hub.slug}`}
                className="block p-4 bg-white rounded-lg border border-wedding-pink/20 hover:border-wedding-pink/40 hover:shadow-sm transition-all"
              >
                <h3 className="font-medium text-gray-800">{hub.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">일정 관련 상세 정보</h2>
          <KeywordCards keywords={scheduleKeywords} />
        </section>

        <DisclosureBox title="주의사항 및 안내" defaultOpen={false}>
          <p className="mb-3">
            웨딩박람회 일정은 주최사 사정에 따라 변경될 수 있습니다. 정확한 일정은 각 박람회 주최사 공식 홈페이지에서 최종 확인하시기 바랍니다.
          </p>
          <p className="mb-3">
            박람회 장소와 시간은 사전에 반드시 확인하시고, 교통편도 미리 파악하시기 바랍니다.
          </p>
          <p>
            일부 박람회는 사전 등록이나 초대권이 필요할 수 있으니, 참석 전 확인이 필요합니다.
          </p>
        </DisclosureBox>

        <Byline />
      </div>
    </>
  )
}

