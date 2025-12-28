// app/sitemap.ts
import { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'
import hubsData from '@/data/hubs.json'
import keywordsData from '@/data/keywords.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  
  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE.domain,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${SITE.domain}wedding-fair-schedule`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE.domain}hub`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.6
    }
  ]

  hubsData.forEach((hub) => {
    urls.push({
      url: `${SITE.domain}hub/${hub.hubSlug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    })
  })

  keywordsData
    .filter(k => k.slug !== 'wedding-fair')
    .forEach((keyword) => {
      urls.push({
        url: `${SITE.domain}${keyword.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6
      })
    })

  urls.push(
    {
      url: `${SITE.domain}about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${SITE.domain}contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${SITE.domain}terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${SITE.domain}privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${SITE.domain}disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  )

  return urls
}

