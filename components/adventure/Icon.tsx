import type { LifeIcon } from '@/data/adventure/types'

const paths: Record<LifeIcon, string> = {
  strength: 'M3 8v8m3-10v12m0-6h12m0-6v12m3-10v8',
  bike: 'M8 7h3l4 10m-8 0 5-10 5 10M15 4h3m-1 0 2 4M8 17a4 4 0 1 1-8 0 4 4 0 0 1 8 0m16 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  book: 'M12 6C8 3 4 4 2 5v15c3-2 6-2 10 0 4-2 7-2 10 0V5c-2-1-6-2-10 1v14',
  spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',
  compass: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M16 8l-2 6-6 2 2-6Z',
  film: 'M3 3h18v18H3ZM7 3v18M17 3v18M3 8h4m-4 8h4m10-8h4m-4 8h4',
  game: 'M7 7h10c3 0 5 6 5 10 0 3-3 4-6 0H8c-3 4-6 3-6 0 0-4 2-10 5-10Zm-2 5h6m-3-3v6m8-4h.01m3 3h.01',
  trophy: 'M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4m-4 2v6m-5 1h10',
  save: 'M4 3h13l4 4v14H3V3ZM7 3v6h9V3M7 21v-8h10v8',
}
export default function Icon({ name, className = '' }: { name: LifeIcon; className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
