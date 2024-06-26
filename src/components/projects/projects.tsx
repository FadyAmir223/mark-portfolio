import type { ProjectTypeSchema } from '@/app/[locale]/projects/[type]/page'
import { getProjects } from '@/data/project'
import type { TLocale } from '@/types/custom'

import Slider from './slider'

type ProjectsProps = {
  locale: TLocale
  type: ProjectTypeSchema
}

export default async function Projects({ locale, type }: ProjectsProps) {
  const projects = await getProjects(locale, type)

  return <Slider type={type} projects={projects} />
}
