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
  // maybe both be unnecessary because of revalidatePath('/en/projects/commercial')
  // ['projects'],
  // { tags: ['projects'] },
)

type AddProjectArgs = {
  name: string
  type: FormDataEntryValue
  locales: {
    en: {
      title: FormDataEntryValue
      description: FormDataEntryValue
    }
    ar: {
      title: FormDataEntryValue
      description: FormDataEntryValue
    }
  }
  imagesLength: number
}

export async function addProject({
  name,
  type,
  locales,
  imagesLength,
}: AddProjectArgs) {
  try {
    await db.project.create({
      data: {
        name,
        type: type as Type,
        images: Array.from({ length: imagesLength }, (_, i) => `${i + 1}.webp`),
        video: `${name}.mp4`,
        localized: {
          createMany: {
            data: [
              {
                locale: 'EN',
                title: locales.en.title as string,
                description: locales.en.description as string,
              },
              {
                locale: 'AR',
                title: locales.ar.title as string,
                description: locales.ar.description as string,
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
