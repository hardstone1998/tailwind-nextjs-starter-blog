import { allAuthors, type Authors } from 'contentlayer/generated'
import AuthorLayout from '@/layouts/AuthorLayout'
import ProfessionalProjectTimeline from '@/components/ProfessionalProjectTimeline'
import AboutProfile from '@/components/AboutProfile'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'
export const metadata = genPageMetadata({ title: '关于', path: '/about' })
export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'qsl') as Authors
  return (
    <>
      <AuthorLayout content={coreContent(author)}>
        <AboutProfile />
      </AuthorLayout>
      <ProfessionalProjectTimeline />
    </>
  )
}
