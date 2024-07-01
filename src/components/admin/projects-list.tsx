'use client'

import { deleteAdminProject } from '@/actions/project'
import type { getAdminProjects } from '@/data/project'
import type { TProjectTypes } from '@/types/custom'

import TrashButton from './trash-button'

type ProjectsListProps = {
  projects: {
    type: TProjectTypes
    data: Awaited<ReturnType<typeof getAdminProjects>>
  }[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  return projects.map(({ type, data }, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index} className='w-1/2'>
      <h4 className='mb-4 text-center text-2xl font-bold capitalize text-primary'>
        {type}
      </h4>
      <ul className='space-y-3 rounded-md border border-primary p-3'>
        {data.map(({ id, localized }) => (
          <li
            key={id}
            className='flex gap-x-4 rounded-md border border-primary bg-background p-3'
          >
            <h4 className='w-full text-lg font-semibold'>
              {localized[0].title}
            </h4>
            <TrashButton id={id} submitServer={deleteAdminProject} />
          </li>
        ))}
      </ul>
    </div>
  ))
}
