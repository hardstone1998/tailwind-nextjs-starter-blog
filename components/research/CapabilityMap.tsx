import Link from '@/components/Link'
import { capabilityDomains } from '@/data/siteConfig'

export default function CapabilityMap() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {capabilityDomains.map((domain, index) => (
        <li key={domain.id}>
          <Link
            href={domain.route}
            className="notebook-card block h-full p-5 transition-transform hover:-translate-y-0.5"
          >
            <span className="font-mono text-xs tracking-[0.16em] text-[var(--muted)]">
              0{index + 1}
            </span>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <h3 className="font-bold text-[var(--ink)]">{domain.label}</h3>
              <span className="font-mono text-sm text-[var(--accent)]">{domain.score}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{domain.description}</p>
          </Link>
        </li>
      ))}
    </ol>
  )
}
