import 'server-only'

import type { Locale, Project, Type } from '@prisma/client'
import { generateKeyBetween } from 'fractional-indexing'
import { unstable_cache } from 'next/cache'

import db from '@/lib/db'
import type { ProjectTypeSchema } from '@/schema/project-types'
import type { TLocale } from '@/types/custom'
import { fractionIndexCompare } from '@/utils/sort-fractional-indexing'

export const getProjects = unstable_cache(
  async (locale: TLocale, type: ProjectTypeSchema) => {
    try {
      const projects = await db.project.findMany({
        where: { type: type.toUpperCase() as Type },
        select: {
          id: true,
          name: true,
          video: true,
          images: true,
          order: true,
          localized: {
            where: { locale: locale.toUpperCase() as Locale },
            select: {
              title: true,
              description: true,
            },
          },
        },
      })

      return projects.sort(fractionIndexCompare)
    } catch {
      return []
    }
  },
  ['projects'],
  { tags: ['projects'] },
)

export async function getAdminProjects(type: Project['type']) {
  try {
    const projects = await db.project.findMany({
      where: { type },
      select: {
        id: true,
        order: true,
        localized: {
          where: { locale: 'EN' },
          select: { title: true },
        },
      },
    })

    return projects.sort(fractionIndexCompare)
  } catch {
    return []
  }
}

type AddProjectArgs = {
  name: string
  type: Type
  locales: {
    en: {
      title: string
      description: string
    }
    ar: {
      title: string
      description: string
    }
  }
  imagesPathList: string[]
  video: string | undefined
}

export async function addProject({
  name,
  type,
  locales,
  imagesPathList,
  video,
}: AddProjectArgs) {
  try {
    const [{ order }] = await db.project.findMany({
      where: { type },
      select: { order: true },
      orderBy: { order: 'desc' },
      take: 1,
    })

    await db.project.create({
      data: {
        name,
        type,
        images: imagesPathList,
        video,
        order: generateKeyBetween(order, null),
        localized: {
          createMany: {
            data: [
              {
                locale: 'EN',
                title: locales.en.title,
                description: locales.en.description,
              },
              {
                locale: 'AR',
                title: locales.ar.title,
                description: locales.ar.description,
              },
            ],
          },
        },
      },
      select: { id: true },
    })
  } catch (e) {
    return { error: 'Failed to upload the project' }
  }
}

export async function deleteProject(id: Project['id']) {
  try {
    return await db.project.delete({
      where: { id },
      select: {
        name: true,
        type: true,
      },
    })
  } catch {
    return { error: 'Could not Delete Project' }
  }
}

export async function reorderAProject(id: Project['id'], keyBetween: string) {
  try {
    return await db.project.update({
      where: { id },
      data: { order: keyBetween },
      select: { type: true },
    })
  } catch {
    return { error: 'Could not Reorder the Project' }
  }
}
