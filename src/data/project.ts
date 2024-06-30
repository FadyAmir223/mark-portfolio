import 'server-only'

import type { Locale, Type } from '@prisma/client'
import { unstable_cache } from 'next/cache'

import db from '@/lib/db'
import type { ProjectTypeSchema } from '@/schema/project-types'

import type { TLocale } from '../types/custom'

export const getProjects = unstable_cache(
  async (locale: TLocale, type: ProjectTypeSchema) => {
    try {
      return await db.project.findMany({
        where: { type: type.toUpperCase() as Type },
        select: {
          id: true,
          name: true,
          video: true,
          images: true,
          localized: {
            where: { locale: locale.toUpperCase() as Locale },
            select: {
              title: true,
              description: true,
            },
          },
        },
      })
    } catch {
      return []
    }
  },
  ['projects'],
  { tags: ['projects'] },
)

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
  imagesLength: number
  video: string | undefined
}

export async function addProject({
  name,
  type,
  locales,
  imagesLength,
  video,
}: AddProjectArgs) {
  try {
    await db.project.create({
      data: {
        name,
        type,
        images: Array.from({ length: imagesLength }, (_, i) => `${i + 1}.webp`),
        video,
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
