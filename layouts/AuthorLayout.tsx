'use client'
import { ReactNode } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { t, language } = useLanguage()
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="py-10">
        <div className="border-b border-[var(--rule)] pt-6 pb-8 md:pb-10">
          <p className="section-label">Researcher profile</p>
          <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            {language === 'zh' ? '关于' : 'About'}
          </h1>
        </div>
        <div className="items-start gap-10 pt-8 xl:grid xl:grid-cols-[15rem_minmax(0,1fr)]">
          <aside className="mx-auto w-full max-w-sm xl:sticky xl:top-8 xl:mx-0">
            <div className="flex flex-col items-center rounded-2xl border border-[var(--rule)] bg-[var(--surface-raised)] px-6 py-7 text-center shadow-[0_1px_0_rgb(24_35_44/0.03)]">
              {avatar && (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={192}
                  height={192}
                  className="h-28 w-28 rounded-full border-4 border-[var(--surface)] object-cover shadow-lg"
                />
              )}
              <h3 className="pt-4 text-xl leading-8 font-bold tracking-tight">{name}</h3>
              <div className="text-[var(--muted)]">{t('homeHero')}</div>
              <div className="mt-1 text-sm text-[var(--muted)]">{company}</div>
              <div className="flex space-x-3 pt-6">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="x" href={twitter} />
                <SocialIcon kind="bluesky" href={bluesky} />
              </div>
            </div>
          </aside>
          <div className="prose dark:prose-invert max-w-none pb-8">{children}</div>
        </div>
      </div>
    </>
  )
}
