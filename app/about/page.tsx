// app/about/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { Byline } from '@/components/site/components/Byline'

export const metadata = generateSeoMetadata({
  title: "소개",
  description: `${SITE.name} 운영자 소개 및 편집 원칙을 안내합니다.`,
  path: "/about"
})

export default function AboutPage() {
  const jsonLd = generateJsonLd({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: '소개', item: `${SITE.domain}about` }
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
            <li className="text-gray-800">소개</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">소개</h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">운영자 소개</h2>
          <p className="mb-4">
            {SITE.name}는 {SITE.editorial.credentials}를 목표로 운영되는 정보 사이트입니다.
          </p>
          <p className="mb-4">
            작성자: {SITE.editorial.authorName}
          </p>
          <p className="mb-4">
            검토자: {SITE.editorial.reviewerName}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">편집 원칙</h2>
          <p className="mb-4">
            본 사이트는 예비부부들이 웨딩박람회 정보를 쉽게 찾고 활용할 수 있도록 객관적이고 정확한 정보를 제공하는 것을 목표로 합니다.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>정확성: 주최사 공식 정보를 기반으로 작성</li>
            <li>객관성: 편향되지 않은 정보 제공</li>
            <li>최신성: 정기적인 정보 업데이트</li>
            <li>신뢰성: 검증된 정보만 제공</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">업데이트 정책</h2>
          <p className="mb-4">
            웨딩박람회 정보는 주최사 사정에 따라 변경될 수 있으므로, 정기적으로 정보를 업데이트하고 있습니다. 최신 정보는 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">문의</h2>
          <p className="mb-4">
            문의사항이 있으시면 {SITE.contact.email}로 연락주시기 바랍니다.
          </p>
        </div>

        <Byline />
      </div>
    </>
  )
}

