// app/terms/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { Byline } from '@/components/site/components/Byline'

export const metadata = generateSeoMetadata({
  title: "이용약관",
  description: `${SITE.name} 이용약관을 안내합니다.`,
  path: "/terms"
})

export default function TermsPage() {
  const jsonLd = generateJsonLd({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: '이용약관', item: `${SITE.domain}terms` }
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
            <li className="text-gray-800">이용약관</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">이용약관</h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제1조 (목적)</h2>
          <p className="mb-4">
            본 약관은 {SITE.name}(이하 "사이트")의 서비스 이용과 관련하여 사이트와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제2조 (정의)</h2>
          <p className="mb-4">
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>"사이트"란 웨딩박람회 정보를 제공하는 정보 사이트를 의미합니다.</li>
            <li>"이용자"란 본 사이트에 접속하여 본 약관에 따라 사이트가 제공하는 서비스를 받는 회원 및 비회원을 의미합니다.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제3조 (서비스의 제공)</h2>
          <p className="mb-4">
            사이트는 웨딩박람회 정보 제공 서비스를 제공합니다. 제공되는 정보는 참고용이며, 정확한 정보는 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제4조 (면책사항)</h2>
          <p className="mb-4">
            사이트는 제공하는 정보의 정확성, 완전성, 신뢰성에 대해 보장하지 않습니다. 이용자가 본 사이트의 정보를 바탕으로 한 결정에 대한 책임은 이용자 본인에게 있습니다.
          </p>
        </div>

        <Byline />
      </div>
    </>
  )
}

