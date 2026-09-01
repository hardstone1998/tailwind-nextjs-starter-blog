'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { useLanguage } from './LanguageProvider'

export default function Comments({ slug }: { slug: string }) {
  const { t, language } = useLanguage()
  const [loadComments, setLoadComments] = useState(false)

  const config = siteMetadata.comments
  if (!config || (config.provider === 'giscus' && !config.giscusConfig?.repositoryId)) {
    return null
  }
  return (
    <>
      {loadComments ? (
        <CommentsComponent
          commentsConfig={
            config.provider === 'giscus'
              ? {
                  ...config,
                  giscusConfig: {
                    ...config.giscusConfig,
                    lang: language === 'zh' ? 'zh-CN' : 'en',
                  },
                }
              : config
          }
          slug={slug}
        />
      ) : (
        <button className="min-h-11 px-3" onClick={() => setLoadComments(true)}>
          {t('loadComments')}
        </button>
      )}
    </>
  )
}
