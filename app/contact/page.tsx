// app/contact/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { Byline } from '@/components/site/components/Byline'

export const metadata = generateSeoMetadata({
  title: "문의",
  description: `${SITE.name} 문의 정보를 안내합니다.`,
  path: "/contact"
})

export default function ContactPage() {
  const jsonLd = generateJsonLd({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: '문의', item: `${SITE.domain}contact` }
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
            <li className="text-gray-800">문의</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">문의</h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">연락처 정보</h2>
          <p className="mb-4">
            문의사항이 있으시면 아래 이메일로 연락주시기 바랍니다.
          </p>
          <div className="bg-wedding-ivory border border-wedding-pink/30 rounded-lg p-6 mb-6">
            <p className="mb-2">
              <strong>이메일:</strong> <a href={`mailto:${SITE.contact.email}`} className="text-wedding-pink">{SITE.contact.email}</a>
            </p>
            <p className="mb-2">
              <strong>지원 시간:</strong> {SITE.contact.supportHours}
            </p>
            <p>
              <strong>응답 시간:</strong> {SITE.contact.responseNote}
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">문의 유형</h2>
          <p className="mb-4">
            다음 사항에 대한 문의를 받고 있습니다:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>웨딩박람회 정보 오류 신고</li>
            <li>콘텐츠 제안 및 피드백</li>
            <li>기타 문의사항</li>
          </ul>
        </div>

        <Byline />
      </div>
    </>
  )
}

