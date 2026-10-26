import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="text-3xl leading-tight font-medium tracking-tight text-[var(--ink)] sm:text-4xl md:text-5xl">
      {children}
    </h1>
  )
}
