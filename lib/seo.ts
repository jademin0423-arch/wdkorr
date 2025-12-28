// lib/seo.ts
import { SITE } from './site'
import { getOgImage } from './images'
import type { Metadata } from 'next'

export interface SeoParams {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

export function generateSeoMetadata(params: SeoParams): Metadata {
  const { title, description, path, keywords = [], image, type = 'website', publishedTime, modifiedTime } = params
  const url = `${SITE.domain}${path === '/' ? '' : path}`
  const ogImage = image || getOgImage(path === '/' ? null : path.split('/').pop() || null)
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE.domain}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`

  return {
    title: `${title} | ${SITE.name}`,
    description,
    keywords: keywords.length > 0 ? keywords.join(', ') : undefined,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      images: [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: title
      }],
      type: type === 'article' ? 'article' : 'website',
      ...(type === 'article' && publishedTime ? {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime
      } : {})
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [ogImageUrl]
    },
    robots: {
      index: true,
      follow: true
    }
  }
}

export function generateJsonLd(params: {
  type: 'WebSite' | 'Organization' | 'BreadcrumbList' | 'Article' | 'WebPage' | 'FAQPage'
  data: Record<string, any>
}): object {
  const { type, data } = params
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }
  return base
}

