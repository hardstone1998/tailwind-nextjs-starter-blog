import { ReactNode } from 'react'

export default function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>
}
