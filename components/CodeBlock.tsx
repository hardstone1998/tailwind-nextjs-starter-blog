'use client'
import { useRef, useState, type HTMLAttributes } from 'react'
import { useLanguage } from './LanguageProvider'
import { copyCode } from '@/lib/copy-code'
export default function CodeBlock({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  const { t } = useLanguage()
  const ref = useRef<HTMLPreElement>(null)
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copy = async () => {
    try {
      await copyCode(ref.current?.textContent ?? undefined, navigator.clipboard)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }
  return (
    <div className="my-5 min-w-0">
      <div className="flex items-center justify-end gap-3">
        <span role="status" className="text-xs">
          {status === 'copied' ? t('copied') : status === 'failed' ? t('copyFailed') : ''}
        </span>
        <button
          type="button"
          onClick={copy}
          className="min-h-11 rounded border border-[var(--rule)] px-3 text-sm"
        >
          {t('copyCode')}
        </button>
      </div>
      <pre ref={ref} {...props}>
        {children}
      </pre>
    </div>
  )
}
