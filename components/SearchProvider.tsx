'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Link from './Link'
import { useLanguage } from './LanguageProvider'
import { getVisiblePosts } from '@/lib/blog-language'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
const SearchContext = createContext<{ openSearch: () => void } | null>(null)
export const useLocalSearch = () => {
  const value = useContext(SearchContext)
  if (!value) throw new Error('Search provider missing')
  return value
}
export function LocalSearchProvider({ children }: { children: ReactNode }) {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<CoreContent<Blog>[] | null>(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  useEffect(() => {
    if (!open || posts) return
    const controller = new AbortController()
    setError(false)
    fetch(`${process.env.BASE_PATH || ''}/search.json`, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error('Index unavailable')
        return r.json()
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('Invalid index')
        setPosts(data)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(true)
      })
    return () => controller.abort()
  }, [open, posts, attempt])
  const results = getVisiblePosts(posts ?? [], language).filter((p) =>
    `${p.title} ${p.summary ?? ''}`.toLowerCase().includes(query.toLowerCase().trim())
  )
  return (
    <SearchContext.Provider value={{ openSearch: () => setOpen(true) }}>
      {children}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-70">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto p-4 pt-20">
          <DialogPanel className="mx-auto max-w-2xl rounded-xl border border-[var(--rule)] bg-[var(--surface-raised)] p-5 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <DialogTitle className="text-xl font-bold">{t('search')}</DialogTitle>
              <button onClick={() => setOpen(false)} className="min-h-11 px-3">
                {t('close')}
              </button>
            </div>
            <input
              data-autofocus
              type="search"
              aria-label={t('search')}
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-4 w-full rounded border-[var(--rule)] bg-[var(--surface)] p-3 text-[var(--ink)]"
            />
            <div className="mt-4 max-h-[60vh] overflow-y-auto" aria-live="polite">
              {error ? (
                <div>
                  <p>{t('searchError')}</p>
                  <button
                    className="mt-3 min-h-11 font-semibold text-[var(--accent)]"
                    onClick={() => setAttempt((n) => n + 1)}
                  >
                    {t('retry')}
                  </button>
                </div>
              ) : !posts ? (
                <p>{t('searchLoading')}</p>
              ) : results.length === 0 ? (
                <p>{t('noContent')}</p>
              ) : (
                <ul className="space-y-2">
                  {results.map((p) => (
                    <li key={p.path}>
                      <Link
                        onClick={() => setOpen(false)}
                        href={`/${p.path}`}
                        className="block rounded border border-[var(--rule)] p-3 hover:bg-[var(--surface)]"
                      >
                        <p className="text-xs text-[var(--muted)]">
                          {new Date(p.date).toLocaleDateString(
                            language === 'zh' ? 'zh-CN' : 'en-US',
                            { timeZone: 'UTC' }
                          )}{' '}
                          · {p.language === 'en' ? 'English' : '中文'}
                        </p>
                        <p
                          lang={p.language === 'en' ? 'en' : 'zh-CN'}
                          className="mt-1 font-semibold"
                        >
                          {p.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </SearchContext.Provider>
  )
}
