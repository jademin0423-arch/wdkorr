// app/hub/[hubSlug]/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { KeywordCards } from '@/components/site/components/KeywordCards'
import { ChecklistBox } from '@/components/site/components/ChecklistBox'
import { Faq } from '@/components/site/components/Faq'
import { DisclosureBox } from '@/components/site/components/DisclosureBox'
import { Byline } from '@/components/site/components/Byline'
import hubsData from '@/data/hubs.json'
import keywordsData from '@/data/keywords.json'

export async function generateStaticParams() {
  return hubsData.map((hub) => ({
    hubSlug: hub.hubSlug
  }))
}

export async function generateMetadata({ params }: { params: { hubSlug: string } }) {
  const hub = hubsData.find(h => h.hubSlug === params.hubSlug)
  if (!hub) {
    return generateSeoMetadata({
      title: "허브",
      description: "웨딩박람회 허브 페이지",
      path: `/hub/${params.hubSlug}`
    })
  }

  return generateSeoMetadata({
    title: hub.hubTitle,
    description: `${hub.hubTitle} 지역의 웨딩박람회 정보를 확인하세요. ${hub.hubKeyword} 및 관련 지역의 웨딩박람회 일정과 후기를 제공합니다.`,
    path: `/hub/${params.hubSlug}`,
    keywords: hub.keywords
  })
}

export default function HubPage({ params }: { params: { hubSlug: string } }) {
  const hub = hubsData.find(h => h.hubSlug === params.hubSlug)
  if (!hub) {
    return <div>허브를 찾을 수 없습니다.</div>
  }

  const hubKeywords = keywordsData
    .filter(k => k.hubSlug === hub.hubSlug)
    .map(k => ({ slug: k.slug, keyword: k.keyword }))

  const recommendedKeywords = hubKeywords
    .filter((_, i) => i < 6)

  const checklistItems = [
    "해당 지역 웨딩박람회 일정 확인",
    "박람회 장소 및 교통편 파악",
    "초대권 또는 사전 등록",
    "관심 업체 리스트 작성",
    "질문 사항 정리"
  ]

  const faqItems = [
    {
      question: `${hub.hubTitle} 지역 웨딩박람회는 언제 열리나요?`,
      answer: `${hub.hubTitle} 지역의 웨딩박람회는 보통 봄과 가을에 집중적으로 개최됩니다. 정확한 일정은 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다.`
    },
    {
      question: `${hub.hubTitle} 지역 웨딩박람회 특징은 무엇인가요?`,
      answer: `${hub.hubTitle} 지역의 웨딩박람회는 해당 지역의 웨딩 홀, 스튜디오, 드레스샵 등이 참가하여 지역 특색에 맞는 서비스를 제공합니다.`
    },
    {
      question: `${hub.hubTitle} 지역 웨딩박람회에서 어떤 혜택을 받을 수 있나요?`,
      answer: `지역별 웨딩박람회에서는 할인 혜택, 사은품, 무료 상담 서비스 등을 제공합니다. 일부 업체는 박람회 특가 상품을 제공하기도 합니다.`
    }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateJsonLd({
        type: 'BreadcrumbList',
        data: {
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
            { '@type': 'ListItem', position: 2, name: '허브', item: `${SITE.domain}hub` },
            { '@type': 'ListItem', position: 3, name: hub.hubTitle, item: `${SITE.domain}hub/${params.hubSlug}` }
          ]
        }
      }),
      generateJsonLd({
        type: 'WebPage',
        data: {
          name: hub.hubTitle,
          description: `${hub.hubTitle} 지역 웨딩박람회 정보`,
          url: `${SITE.domain}hub/${params.hubSlug}`
        }
      }),
      generateJsonLd({
        type: 'FAQPage',
        data: {
          mainEntity: faqItems.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer
            }
          }))
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
            <li><Link href="/hub" className="hover:text-wedding-pink">허브</Link></li>
            <li>/</li>
            <li className="text-gray-800">{hub.hubTitle}</li>
          </ol>
        </nav>

        <div className="mb-6">
          <Link
            href="/"
            className="inline-block px-4 py-2 text-sm bg-wedding-ivory border border-wedding-pink/30 rounded-lg hover:bg-wedding-pink/10 transition-colors"
          >
            ← 전국 종합 가이드
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {hub.hubTitle} 웨딩박람회
        </h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <p className="text-lg mb-4">
            {hub.hubTitle} 지역의 웨딩박람회 정보를 한눈에 확인하세요. {hub.hubKeyword}를 비롯한 해당 지역의 모든 웨딩박람회 일정, 후기, 추천 정보를 제공합니다.
          </p>
          <p className="mb-4">
            {hub.hubTitle} 지역의 웨딩박람회는 해당 지역의 주요 웨딩 홀, 스튜디오, 드레스샵 등이 참가하여 다양한 서비스와 혜택을 제공합니다. 지역 특색에 맞는 웨딩 서비스를 비교하고 선택할 수 있는 좋은 기회입니다.
          </p>
        </div>

        <ChecklistBox title={`${hub.hubTitle} 웨딩박람회 준비 체크리스트`} items={checklistItems} />

        <section className="my-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">추천 웨딩박람회 정보</h2>
          <KeywordCards keywords={recommendedKeywords} />
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">전체 웨딩박람회 정보</h2>
          <KeywordCards keywords={hubKeywords} />
        </section>

        <Faq items={faqItems} />

        <DisclosureBox title="주의사항 및 안내" defaultOpen={false}>
          <p className="mb-3">
            웨딩박람회 일정과 혜택 정보는 주최사 사정에 따라 변경될 수 있습니다. 정확한 정보는 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다.
          </p>
          <p className="mb-3">
            무료 초대권, 사은품, 할인 혜택의 조건은 박람회 및 업체별로 상이할 수 있습니다.
          </p>
          <p>
            사칭 사이트나 피싱 사이트에 주의하시고, 유료 결제를 유도하는 사이트는 신중히 판단하시기 바랍니다.
          </p>
        </DisclosureBox>

        <Byline />
      </div>
    </>
  )
}

