'use client'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { useLanguage } from './LanguageProvider'
export default function ThemeSwitch() {
  const { setTheme } = useTheme()
  const { t } = useLanguage()
  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label={t('themeLabel')}
        className="flex h-11 w-11 items-center justify-center rounded text-xl text-[var(--muted)]"
      >
        <span aria-hidden="true">◐</span>
      </MenuButton>
      <MenuItems className="absolute right-0 z-50 mt-2 w-40 rounded border border-[var(--rule)] bg-[var(--surface-raised)] p-1 shadow-lg">
        {(['light', 'dark', 'system'] as const).map((value) => (
          <MenuItem key={value}>
            <button
              onClick={() => setTheme(value)}
              className="w-full rounded px-3 py-3 text-left text-sm data-focus:bg-[var(--surface)]"
            >
              {t(value)}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}
