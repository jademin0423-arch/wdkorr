// app/[slug]/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { getRandomImages, getOgImage } from '@/lib/images'
import { Toc } from '@/components/site/components/Toc'
import { ChecklistBox } from '@/components/site/components/ChecklistBox'
import { DisclosureBox } from '@/components/site/components/DisclosureBox'
import { Byline } from '@/components/site/components/Byline'
import keywordsData from '@/data/keywords.json'
import hubsData from '@/data/hubs.json'

export async function generateStaticParams() {
  return keywordsData
    .filter(k => k.slug !== 'wedding-fair')
    .map((keyword) => ({
      slug: keyword.slug
    }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const keyword = keywordsData.find(k => k.slug === params.slug)
  if (!keyword) {
    return generateSeoMetadata({
      title: "페이지",
      description: "웨딩박람회 정보",
      path: `/${params.slug}`
    })
  }

  const hub = keyword.hubSlug ? hubsData.find(h => h.hubSlug === keyword.hubSlug) : null
  const ogImage = getOgImage(params.slug)

  return generateSeoMetadata({
    title: keyword.keyword,
    description: `${keyword.keyword} 정보를 확인하세요. 웨딩박람회 일정, 후기, 추천 정보를 제공합니다.`,
    path: `/${params.slug}`,
    keywords: [keyword.keyword, ...(hub ? hub.keywords.slice(0, 5) : [])],
    image: ogImage,
    type: 'article',
    publishedTime: SITE.editorial.lastUpdatedDefault,
    modifiedTime: SITE.editorial.lastUpdatedDefault
  })
}

function getRelatedLinks(slug: string) {
  const keyword = keywordsData.find(k => k.slug === slug)
  if (!keyword) return { root: null, hub: null, siblings: [], guide: null }

  const hub = keyword.hubSlug ? hubsData.find(h => h.hubSlug === keyword.hubSlug) : null
  
  const siblings = keywordsData
    .filter(k => k.hubSlug === keyword.hubSlug && k.slug !== slug && k.type === 'detail')
    .slice(0, 2)
    .map(k => ({ slug: k.slug, keyword: k.keyword }))

  const guideLink = keywordsData.find(k => k.slug === 'wedding-fair-schedule') || null

  return {
    root: { slug: 'wedding-fair', keyword: '웨딩박람회' },
    hub: hub ? { slug: hub.hubSlug, title: hub.hubTitle } : null,
    siblings,
    guide: guideLink ? { slug: guideLink.slug, keyword: guideLink.keyword } : null
  }
}

export default function DetailPage({ params }: { params: { slug: string } }) {
  const keyword = keywordsData.find(k => k.slug === params.slug)
  if (!keyword) {
    return <div>페이지를 찾을 수 없습니다.</div>
  }

  const hub = keyword.hubSlug ? hubsData.find(h => h.hubSlug === keyword.hubSlug) : null
  const images = getRandomImages(params.slug, 4)
  const related = getRelatedLinks(params.slug)

  const headings = [
    { id: 'overview', text: '개요', level: 2 },
    { id: 'schedule', text: '일정 및 정보', level: 2 },
    { id: 'preparation', text: '준비사항', level: 2 },
    { id: 'benefits', text: '혜택 및 주의사항', level: 2 },
    { id: 'notice', text: '주의사항 및 안내', level: 2 }
  ]

  const checklistItems = [
    "박람회 일정 및 장소 사전 확인",
    "초대권 또는 사전 등록 완료",
    "결혼 예정일 및 예산 정리",
    "관심 업체 리스트 작성",
    "질문 사항 정리",
    "신분증 및 명함 준비"
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      generateJsonLd({
        type: 'BreadcrumbList',
        data: {
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
            ...(hub ? [{ '@type': 'ListItem', position: 2, name: hub.hubTitle, item: `${SITE.domain}hub/${hub.hubSlug}` }] : []),
            { '@type': 'ListItem', position: hub ? 3 : 2, name: keyword.keyword, item: `${SITE.domain}${params.slug}` }
          ]
        }
      }),
      generateJsonLd({
        type: 'Article',
        data: {
          headline: keyword.keyword,
          description: `${keyword.keyword} 정보`,
          author: {
            '@type': 'Organization',
            name: SITE.editorial.authorName
          },
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.domain
          },
          datePublished: SITE.editorial.lastUpdatedDefault,
          dateModified: SITE.editorial.lastUpdatedDefault,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE.domain}${params.slug}`
          }
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
          <ol className="flex items-center gap-2 flex-wrap">
            <li><Link href="/" className="hover:text-wedding-pink">홈</Link></li>
            {hub && (
              <>
                <li>/</li>
                <li><Link href={`/hub/${hub.hubSlug}`} className="hover:text-wedding-pink">{hub.hubTitle}</Link></li>
              </>
            )}
            <li>/</li>
            <li className="text-gray-800">{keyword.keyword}</li>
          </ol>
        </nav>

        <div className="mb-6 flex flex-wrap gap-3">
          {related.root && (
            <Link
              href={`/${related.root.slug}`}
              className="inline-block px-4 py-2 text-sm bg-wedding-ivory border border-wedding-pink/30 rounded-lg hover:bg-wedding-pink/10 transition-colors"
            >
              ← {related.root.keyword}
            </Link>
          )}
          {related.hub && (
            <Link
              href={`/hub/${related.hub.slug}`}
              className="inline-block px-4 py-2 text-sm bg-wedding-ivory border border-wedding-pink/30 rounded-lg hover:bg-wedding-pink/10 transition-colors"
            >
              {related.hub.title} 허브
            </Link>
          )}
        </div>

        <div className="bg-wedding-ivory border border-wedding-pink/30 rounded-lg p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{keyword.keyword}</h1>
          <p className="text-gray-700 leading-relaxed">
            {keyword.keyword}에 대한 종합 정보를 제공합니다. 일정, 후기, 추천 정보를 확인하세요.
          </p>
        </div>

        <Toc headings={headings} />

        <section id="overview" className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2>개요</h2>
          <p>
            {keyword.keyword}는 예비부부들이 결혼 준비에 필요한 다양한 서비스를 한 자리에서 비교하고 상담받을 수 있는 중요한 기회입니다. 웨딩 홀, 스튜디오, 드레스, 메이크업 등 결혼 준비 전반에 걸친 정보를 효율적으로 수집할 수 있습니다.
          </p>
          {images[0] && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden my-6">
              <Image
                src={`/imge/${images[0]}`}
                alt={`${keyword.keyword} 개요 및 기본 정보 안내`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </section>

        <section id="schedule" className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2>일정 및 정보</h2>
          <p>
            {keyword.keyword}의 정확한 일정과 장소는 주최사 공식 홈페이지에서 확인하시기 바랍니다. 박람회는 보통 봄과 가을에 집중적으로 개최되며, 사전 등록이나 초대권이 필요할 수 있습니다.
          </p>
          {images[1] && (
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden my-6">
              <Image
                src={`/imge/${images[1]}`}
                alt={`${keyword.keyword} 일정 및 장소 정보 확인 가이드`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </section>

        <section id="preparation" className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2>준비사항</h2>
          <p>
            웨딩박람회에 참석하기 전에 미리 준비하면 더 효율적으로 정보를 수집할 수 있습니다. 결혼 예정일, 예산 범위, 관심 있는 업체 등을 정리해 가시면 도움이 됩니다.
          </p>
          <ChecklistBox title="준비 체크리스트" items={checklistItems} />
          {images[2] && (
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden my-6">
              <Image
                src={`/imge/${images[2]}`}
                alt={`${keyword.keyword} 참석 전 준비사항 및 체크리스트`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </section>

        <section id="benefits" className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2>혜택 및 주의사항</h2>
          <p>
            웨딩박람회에서는 다양한 할인 혜택, 사은품, 무료 상담 서비스를 제공합니다. 일부 업체는 박람회 특가 상품을 제공하기도 하므로, 미리 관심 있는 업체를 정리해 가시면 좋습니다.
          </p>
          {images[3] && (
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden my-6">
              <Image
                src={`/imge/${images[3]}`}
                alt={`${keyword.keyword} 제공 혜택 및 주의사항 안내`}
                fill
                className="object-cover"
              />
            </div>
          )}
        </section>

        <section id="notice" className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2>주의사항 및 안내</h2>
          <DisclosureBox title="중요 안내사항" defaultOpen={true}>
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
        </section>

        <section className="my-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">관련 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.siblings.map((sibling) => (
              <Link
                key={sibling.slug}
                href={`/${sibling.slug}`}
                className="block p-4 bg-white rounded-lg border border-wedding-pink/20 hover:border-wedding-pink/40 hover:shadow-sm transition-all"
              >
                <h3 className="font-medium text-gray-800">{sibling.keyword}</h3>
              </Link>
            ))}
            {related.guide && (
              <Link
                href={`/${related.guide.slug}`}
                className="block p-4 bg-white rounded-lg border border-wedding-pink/20 hover:border-wedding-pink/40 hover:shadow-sm transition-all"
              >
                <h3 className="font-medium text-gray-800">{related.guide.keyword}</h3>
              </Link>
            )}
          </div>
        </section>

        <Byline lastUpdated={SITE.editorial.lastUpdatedDefault} />
      </div>
    </>
  )
}

