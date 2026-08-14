'use client'

import { useEffect } from 'react'
import { useLanguage, type SiteLanguage } from './LanguageProvider'

export default function ArticleLanguageRegistration({
  paths,
}: {
  paths: Partial<Record<SiteLanguage, string>>
}) {
  const { setArticlePaths } = useLanguage()

  useEffect(() => {
    setArticlePaths(paths)
    return () => setArticlePaths({})
  }, [paths, setArticlePaths])

  return null
}
