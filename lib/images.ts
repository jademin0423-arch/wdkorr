// lib/images.ts
const IMAGES = [
  "20250917_112053_1.png",
  "20250917_112053_2.png",
  "20250917_112053_3.png",
  "20250917_112053_4.png",
  "20250917_112053_5.png",
  "20250917_112854_1.png",
  "20250917_112854_2.png",
  "20250917_112854_3.png",
  "20250917_112854_4.png",
  "20250917_112854_5.png",
  "20250917_112854_6.png",
  "20250918_122214_1.png",
  "20250918_122214_2.png",
  "20250918_122214_3.png",
  "20250918_122214_4.png",
  "20250918_122214_5.png",
  "20250918_122214_6.png",
  "20250920_154349_1.png",
  "20250920_154349_2.png",
  "20250920_154349_3.png",
  "20250920_154349_4.png",
  "20250920_154349_5.png",
  "20250920_154349_6.png",
  "20250920_155055_1.png",
  "20250920_155055_2.png",
  "20250920_155055_3.png",
  "20250920_155055_4.png",
  "20250920_155055_5.png",
  "20250920_155055_6.png",
  "20250920_155055_7.png",
  "20250921_203234_1.png",
  "20250921_203234_4.png",
  "20250921_204517_1.png",
  "20250921_204517_2.png",
  "20250921_204517_3.png",
  "20250921_204517_4.png",
  "20250921_204540_1.png",
  "20250923_212233_2.png",
  "20250923_212233_4.png",
  "20250923_212233_5.png",
  "20250923_212233_6.png",
  "20250923_212233_7.png",
  "20250924_152220_2.png",
  "20250924_152220_3.png",
  "20250924_152220_4.png",
  "20250924_152220_5.png",
  "20250924_152919_1.png",
  "20250924_152919_2.png",
  "20250924_152919_3.png",
  "20250924_152919_4.png",
  "20250924_152919_5.png",
  "20250925_205839_1.png",
  "20250925_205839_6.png",
  "20250925_205839_7.png",
  "20250925_212846_9.png",
  "20250928_193217_1.png",
  "20250928_193217_3.png",
  "20250928_193217_5.png",
  "20250928_193217_6.png",
  "20250928_193217_7.png",
  "20250928_195326_4.png",
  "20250928_195326_6.png",
  "20250928_200053_2.png",
  "20250928_200053_3.png",
  "20250928_200053_4.png",
  "20250928_200053_5.png",
  "20250928_200053_6.png",
  "20250928_200824_4.png",
  "20250928_200824_5.png",
  "20250928_200824_6.png",
  "20250928_200824_7.png",
  "20250928_200824_8.png",
  "568762912459e51e2cbac9155f241418_9DtR7U6Yvf.jpg",
  "changwon-wedding-expo-consulting-booth-04.png",
  "changwon-wedding-expo-free-invitation-03.png",
  "changwon-wedding-expo-location-schedule-02.png",
  "changwon-wedding-expo-overview-01.png",
  "changwon-wedding-expo-planning-after-05.png",
  "changwon-wedding-expo-thumbnail-01.png",
  "ChatGPT Image 2025년 12월 14일 오후 10_00_55.png",
  "gimpo-howto-wedding-expo-consultation.webp.png",
  "gimpo-howto-wedding-expo-hall-view.png",
  "gimpo-howto-wedding-expo-hero.png",
  "gimpo-howto-wedding-expo-overview.png",
  "gimpo-howto-wedding-expo.png",
  "gimpo-wedding-planning-couple.webp.png"
]

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  let random = seed
  for (let i = shuffled.length - 1; i > 0; i--) {
    random = (random * 9301 + 49297) % 233280
    const j = Math.floor((random / 233280) * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getRandomImages(slug: string, count: number = 4): string[] {
  const seed = simpleHash(slug)
  const shuffled = seededShuffle(IMAGES, seed)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function getOgImage(slug: string | null): string {
  if (!slug) {
    return "/imge/main-hero/main-hero.png"
  }
  const images = getRandomImages(slug, 5)
  return `/imge/${images[0]}`
}

