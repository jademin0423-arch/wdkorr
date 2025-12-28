// app/privacy/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { Byline } from '@/components/site/components/Byline'

export const metadata = generateSeoMetadata({
  title: "개인정보처리방침",
  description: `${SITE.name} 개인정보처리방침을 안내합니다.`,
  path: "/privacy"
})

export default function PrivacyPage() {
  const jsonLd = generateJsonLd({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: '개인정보처리방침', item: `${SITE.domain}privacy` }
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
            <li className="text-gray-800">개인정보처리방침</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">개인정보처리방침</h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제1조 (개인정보의 처리 목적)</h2>
          <p className="mb-4">
            {SITE.name}는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제2조 (개인정보의 처리 및 보유기간)</h2>
          <p className="mb-4">
            본 사이트는 정보 제공 목적의 정적 사이트로, 개인정보를 수집하거나 보유하지 않습니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제3조 (개인정보의 제3자 제공)</h2>
          <p className="mb-4">
            본 사이트는 개인정보를 제3자에게 제공하지 않습니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제4조 (개인정보처리 위탁)</h2>
          <p className="mb-4">
            본 사이트는 개인정보 처리업무를 위탁하지 않습니다.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">제5조 (정보주체의 권리·의무 및 행사방법)</h2>
          <p className="mb-4">
            본 사이트는 개인정보를 수집하지 않으므로, 정보주체의 권리 행사와 관련된 절차는 적용되지 않습니다.
          </p>
        </div>

        <Byline />
      </div>
    </>
  )
}

