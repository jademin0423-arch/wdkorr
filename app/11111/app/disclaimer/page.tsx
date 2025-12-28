// app/disclaimer/page.tsx
import Link from 'next/link'
import { generateSeoMetadata, generateJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/site'
import { DisclosureBox } from '@/components/site/components/DisclosureBox'
import { Byline } from '@/components/site/components/Byline'

export const metadata = generateSeoMetadata({
  title: "면책사항",
  description: `${SITE.name} 면책사항을 안내합니다.`,
  path: "/disclaimer"
})

export default function DisclaimerPage() {
  const jsonLd = generateJsonLd({
    type: 'BreadcrumbList',
    data: {
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: '면책사항', item: `${SITE.domain}disclaimer` }
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
            <li className="text-gray-800">면책사항</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">면책사항</h1>

        <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
          <DisclosureBox title="중요 안내사항" defaultOpen={true}>
            <p className="mb-3">
              본 사이트({SITE.name})는 웨딩박람회 정보를 제공하는 정보 사이트이며, 박람회 주최사가 아닙니다.
            </p>
            <p className="mb-3">
              웨딩박람회 일정, 장소, 혜택 정보는 주최사 사정에 따라 변경될 수 있습니다. 정확한 정보는 각 박람회 주최사 공식 홈페이지에서 확인하시기 바랍니다.
            </p>
            <p className="mb-3">
              무료 초대권, 사은품, 할인 혜택의 조건은 박람회 및 업체별로 상이할 수 있습니다. 최종 판단과 결정은 사용자 본인에게 책임이 있습니다.
            </p>
            <p className="mb-3">
              본 사이트에서 제공하는 정보는 참고용이며, 제공되는 정보의 정확성, 완전성, 신뢰성에 대해 보장하지 않습니다.
            </p>
            <p>
              사칭 사이트나 피싱 사이트에 주의하시고, 유료 결제를 유도하는 사이트는 신중히 판단하시기 바랍니다.
            </p>
          </DisclosureBox>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">면책 조항</h2>
          <p className="mb-4">
            본 사이트는 제공하는 정보로 인해 발생하는 어떠한 손해에 대해서도 책임을 지지 않습니다. 이용자가 본 사이트의 정보를 바탕으로 한 결정에 대한 책임은 이용자 본인에게 있습니다.
          </p>
        </div>

        <Byline />
      </div>
    </>
  )
}

