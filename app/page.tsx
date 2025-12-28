// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE, MAIN_HERO_IMAGE } from '@/lib/site'
import { HubCards } from '@/components/site/components/HubCards'
import { KeywordCards } from '@/components/site/components/KeywordCards'
import { ChecklistBox } from '@/components/site/components/ChecklistBox'
import { Faq } from '@/components/site/components/Faq'
import { DisclosureBox } from '@/components/site/components/DisclosureBox'
import { Byline } from '@/components/site/components/Byline'
import hubsData from '@/data/hubs.json'
import keywordsData from '@/data/keywords.json'

export const metadata = generateSeoMetadata({
  title: "웨딩박람회",
  description: "전국 웨딩박람회 일정과 정보를 한눈에 확인하세요. 지역별, 일정별 웨딩박람회 가이드와 후기를 제공합니다.",
  path: "/",
  keywords: ["웨딩박람회", "웨딩박람회일정", "웨딩박람회후기", "웨딩박람회추천"]
})

export default function HomePage() {
  const hubKeywords = hubsData.map(hub => {
    const keyword = keywordsData.find(k => k.keyword === hub.hubKeyword)
    return keyword ? { slug: keyword.slug, keyword: keyword.keyword } : null
  }).filter(Boolean) as Array<{ slug: string; keyword: string }>

  const popularKeywords = keywordsData
    .filter(k => k.type === 'detail' && k.priority >= 0.9)
    .slice(0, 12)
    .map(k => ({ slug: k.slug, keyword: k.keyword }))

  const faqItems = [
    {
      question: "웨딩박람회는 언제 열리나요?",
      answer: "웨딩박람회는 연중 다양한 시기에 개최됩니다. 주요 시기는 봄(3-5월), 가을(9-11월)이며, 지역별로 일정이 다릅니다. 정확한 일정은 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다."
    },
    {
      question: "웨딩박람회 입장료는 얼마인가요?",
      answer: "대부분의 웨딩박람회는 무료 입장이 가능합니다. 다만, 일부 박람회는 사전 등록이나 초대권이 필요할 수 있으니 사전 확인이 필요합니다."
    },
    {
      question: "웨딩박람회에서 무엇을 준비해야 하나요?",
      answer: "결혼 예정일, 예산 계획, 관심 있는 웨딩 홀 및 스튜디오 정보를 미리 정리해 가시면 도움이 됩니다. 또한 신분증과 명함을 준비하시면 각종 혜택 신청에 유리합니다."
    },
    {
      question: "웨딩박람회에서 어떤 혜택을 받을 수 있나요?",
      answer: "웨딩박람회에서는 다양한 할인 혜택, 사은품, 무료 상담 서비스를 제공합니다. 일부 업체는 박람회 특가 상품을 제공하기도 합니다."
    },
    {
      question: "웨딩박람회는 어떻게 찾나요?",
      answer: "지역별 웨딩박람회 일정은 본 사이트의 지역별 허브 페이지에서 확인하실 수 있습니다. 또한 각 박람회 주최사 공식 홈페이지에서도 상세 정보를 확인할 수 있습니다."
    }
  ]

  const checklistItems = [
    "결혼 예정일과 예산 범위 정리",
    "관심 있는 웨딩 홀 및 스튜디오 리스트 작성",
    "신분증 및 명함 준비",
    "박람회 일정 및 장소 사전 확인",
    "초대권 또는 사전 등록 완료",
    "질문 리스트 준비 (홀, 스튜디오, 드레스 등)"
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateJsonLd({
        type: 'WebSite',
        data: {
          name: SITE.name,
          url: SITE.domain,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE.domain}?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          }
        }
      }),
      generateJsonLd({
        type: 'Organization',
        data: {
          name: SITE.name,
          url: SITE.domain,
          contactPoint: {
            '@type': 'ContactPoint',
            email: SITE.contact.email,
            contactType: 'customer service'
          }
        }
      }),
      generateJsonLd({
        type: 'BreadcrumbList',
        data: {
          itemListElement: [{
            '@type': 'ListItem',
            position: 1,
            name: '홈',
            item: SITE.domain
          }]
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
        <section className="mb-12">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={`/imge/main-hero/${MAIN_HERO_IMAGE}`}
              alt="예비부부를 위한 전국 웨딩박람회 일정과 체크리스트 안내"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            전국 웨딩박람회 일정 총정리
          </h1>
          <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
            <p className="text-lg mb-4">
              결혼 준비의 첫 단계, 웨딩박람회 정보를 한눈에 확인하세요. 전국 각 지역의 웨딩박람회 일정과 후기, 추천 정보를 지역별, 일정별로 정리했습니다.
            </p>
            <p className="mb-4">
              웨딩박람회는 예비부부들이 웨딩 홀, 스튜디오, 드레스, 메이크업 등 결혼 준비에 필요한 모든 서비스를 한 자리에서 비교하고 상담받을 수 있는 기회입니다. 각 지역별로 개최되는 박람회의 특징과 혜택을 미리 파악하시면 더 효율적으로 준비하실 수 있습니다.
            </p>
            <p className="mb-4">
              본 가이드는 서울, 경기도를 비롯한 수도권부터 충청, 영남, 호남, 강원, 제주까지 전국 각 지역의 웨딩박람회 정보를 제공합니다. 또한 박람회 일정, 후기, 추천 정보도 함께 확인하실 수 있습니다.
            </p>
          </div>
        </section>

        <ChecklistBox title="웨딩박람회 준비 체크리스트" items={checklistItems} />

        <section className="my-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">지역별 웨딩박람회 허브</h2>
          <p className="text-gray-700 mb-6">
            전국을 7개 권역으로 나누어 각 지역의 웨딩박람회 정보를 제공합니다. 관심 있는 지역을 선택하여 상세 정보를 확인하세요.
          </p>
          <HubCards />
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">핵심 바로가기</h2>
          <p className="text-gray-700 mb-6">
            각 지역의 대표 웨딩박람회 정보를 빠르게 확인하세요.
          </p>
          <KeywordCards keywords={hubKeywords} />
        </section>

        <section className="my-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">인기 웨딩박람회 정보</h2>
          <p className="text-gray-700 mb-6">
            많은 예비부부들이 관심을 보이는 주요 웨딩박람회 정보입니다.
          </p>
          <KeywordCards keywords={popularKeywords} />
        </section>

        <section className="my-12">
          <Link
            href="/wedding-fair-schedule"
            className="inline-block px-6 py-3 bg-wedding-pink text-white rounded-lg hover:bg-wedding-pink/90 transition-colors font-medium mb-8"
          >
            전체 웨딩박람회 일정 보기 →
          </Link>
        </section>

        <Faq items={faqItems} />

        <DisclosureBox title="면책사항 및 안내" defaultOpen={false}>
          <p className="mb-3">
            본 사이트는 웨딩박람회 정보를 제공하는 정보 사이트이며, 박람회 주최사가 아닙니다.
          </p>
          <p className="mb-3">
            웨딩박람회 일정, 장소, 혜택 정보는 주최사 사정에 따라 변경될 수 있습니다. 정확한 정보는 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다.
          </p>
          <p className="mb-3">
            무료 초대권, 사은품, 할인 혜택의 조건은 박람회 및 업체별로 상이할 수 있습니다. 최종 판단과 결정은 사용자 본인에게 책임이 있습니다.
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

