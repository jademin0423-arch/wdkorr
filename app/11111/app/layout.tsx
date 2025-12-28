// app/layout.tsx
import type { Metadata } from 'next'
import { SITE } from '@/lib/site'
import { SiteShell } from '@/components/site/SiteShell'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`
  },
  description: '전국 웨딩박람회 일정과 정보를 한눈에 확인하세요. 지역별, 일정별 웨딩박람회 가이드와 후기를 제공합니다.',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}

