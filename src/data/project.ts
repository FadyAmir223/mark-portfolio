import 'server-only'

import type { Locale, Type } from '@prisma/client'
import { unstable_cache } from 'next/cache'

import type { ProjectTypeSchema } from '@/app/[locale]/projects/[type]/page'
import db from '@/lib/db'

import type { TLocale } from '../types/custom'

export const getProjects = unstable_cache(
  async (locale: TLocale, type: ProjectTypeSchema) =>
    db.project.findMany({
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
    }),
  // maybe both be unnecessary because of revalidatePath('/en/projects/commercial')
  // ['projects'],
  // { tags: ['projects'] },
)
