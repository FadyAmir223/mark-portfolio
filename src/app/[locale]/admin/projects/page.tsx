import type { Project } from '@prisma/client'

import ProjectsList from '@/components/admin/projects-list'
import { getAdminProjects } from '@/data/project'
import { projectTypes } from '@/utils/constants'

export default async function Projects() {
  const [commercial, residential] = await Promise.all(
    projectTypes.map((type) =>
      getAdminProjects(type.toUpperCase() as Project['type']),
    ),
  )

  return (
    <div className='flex h-full gap-x-4'>
      <ProjectsList
        projects={[
          { type: 'commercial', data: commercial },
          { type: 'residential', data: residential },
        ]}
      />
    </div>
  )
}
