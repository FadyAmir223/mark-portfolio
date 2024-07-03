'use client'

import type { DropResult } from '@hello-pangea/dnd'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useOptimistic, useTransition } from 'react'

import { deleteAdminProject, reorderProject } from '@/actions/project'
import { useToast } from '@/components/ui/use-toast'
import type { getAdminProjects } from '@/data/project'
import type { TProjectTypes } from '@/types/custom'

import TrashButton from './trash-button'

type Project = {
  type: TProjectTypes
  data: Awaited<ReturnType<typeof getAdminProjects>>
}

type ProjectsListProps = {
  projects: Project[]
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const [optimisticProjects, reorderProjects] = useOptimistic(
    projects,
    (_, newProjects: Project[]) => newProjects,
  )

  const [, startTransition] = useTransition()
  const { toast } = useToast()

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) return

    const reorderedProjects = optimisticProjects.map((project) => {
      if (project.type !== source.droppableId) return project

      const items = Array.from(project.data)
      const [reorderedItem] = items.splice(source.index, 1)
      items.splice(destination.index, 0, reorderedItem)
      return { ...project, data: items }
    })

    const indexOfType = reorderedProjects.findIndex(
      ({ type }) => destination.droppableId === type,
    )

    const columnProjects = reorderedProjects[indexOfType].data

    const { id } = columnProjects[destination.index]
    const start = columnProjects[destination.index - 1]?.order
    const end = columnProjects[destination.index + 1]?.order

    startTransition(() => {
      reorderProjects(reorderedProjects)

      reorderProject({ id, start, end })
        .then((response) => {
          if (response?.error)
            toast({
              description: response.error,
              variant: 'destructive',
            })
        })
        .catch(() => {
          toast({
            description: 'Error While Reordering the project',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {optimisticProjects.map(({ type, data }) => (
        <div key={type} className='w-1/2'>
          <h4 className='mb-4 text-center text-2xl font-bold capitalize text-primary'>
            {type}
          </h4>

          <Droppable droppableId={type}>
            {(droppableProvided) => (
              <ul
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className='rounded-md border border-primary px-3 pt-3'
              >
                {data.map(({ id, localized }, draggableIndex) => (
                  <Draggable key={id} draggableId={id} index={draggableIndex}>
                    {(draggableProvided) => (
                      <li
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.draggableProps}
                        {...draggableProvided.dragHandleProps}
                        style={{ ...draggableProvided.draggableProps.style }}
                        className='mb-3 flex gap-x-4 rounded-md border border-primary bg-background p-3'
                      >
                        <h4 className='w-full select-none text-lg font-semibold'>
                          {localized[0].title}
                        </h4>
                        <TrashButton
                          id={id}
                          submitServer={deleteAdminProject}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  )
}
