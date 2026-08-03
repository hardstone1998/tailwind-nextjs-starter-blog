import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '实验室' })

export default function Projects() {
  return (
    <>
      <div className="py-10 sm:py-14">
        <div className="max-w-3xl">
          <p className="section-label">Active labs</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl">
            实验室
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            记录可运行的项目，以及仍在持续迭代的研究实验。
          </p>
        </div>
        <div className="container py-8">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                domains={d.domains}
                lab={d.lab}
                status={d.status}
                methods={d.methods}
                outcome={d.outcome}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
