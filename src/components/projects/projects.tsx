import { getProjects } from '@/data/project'
import type { ProjectTypeSchema } from '@/schema/project-types'
import type { TLocale } from '@/types/custom'

import Slider from './slider'

type ProjectsProps = {
  locale: TLocale
  type: ProjectTypeSchema
}

export default async function Projects({ locale, type }: ProjectsProps) {
  const projects = await getProjects(locale, type)

  return (
    <section className='mb-10'>
      <ul className='space-y-6'>
        <Slider type={type} projects={projects} />
      </ul>
    </section>
  )
}
