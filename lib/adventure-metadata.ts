import type { Metadata } from 'next'

export function adventureMetadata(title: string, path: string, description: string): Metadata {
  const fullTitle = `${title} · qiaoshilei 的冒险存档`
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: 'qiaoshilei 的冒险存档',
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: { title: fullTitle, description, card: 'summary' },
  }
}
