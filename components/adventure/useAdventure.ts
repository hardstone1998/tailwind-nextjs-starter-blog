'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { lifeText } from '@/lib/adventure'
import type { LifeText } from '@/data/adventure/types'

export function useAdventure() {
  const { language } = useLanguage()
  return {
    language,
    say: (zh: string, en: string) => (language === 'zh' ? zh : en),
    text: (value: LifeText) => lifeText(value, language),
  }
}
