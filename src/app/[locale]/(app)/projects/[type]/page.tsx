import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'

import H2 from '@/components/h2'
import Projects from '@/components/projects/projects'
import ProjectsSkeleton from '@/components/projects/projects-skeleton'
import {
  type ProjectTypeSchema,
  projectTypeSchema,
} from '@/schema/project-types'
import type { TLocale } from '@/types/custom'
import { cn } from '@/utils/cn'
import { projectTypes } from '@/utils/constants'

type ProjectTypeProps = {
  params: {
    locale: TLocale
    type: unknown
  }
}

export async function generateMetadata({
  params: { locale, type },
}: {
  params: { locale: TLocale; type: ProjectTypeSchema }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Projects' })

  return {
    title: t(`metadata.${type}.title`),
    description: t(`metadata.${type}.desc`),
  }
}

export default function ProjectType({
  params: { locale, type },
}: ProjectTypeProps) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Projects')

  const result = projectTypeSchema.safeParse(type)
  if (!result.success) notFound()

  const currType = result.data

  return (
    <section>
      <div className='mx-auto mb-8 flex w-fit gap-x-3'>
        {projectTypes.map((projectType) => (
          <Link
            key={projectType}
            href={`/${locale}/projects/${projectType}`}
            className={cn(
              'inline-block rounded-md border border-primary px-4 py-2 font-semibold capitalize text-primary shadow-sm transition-colors hover:bg-primary hover:text-background',
              projectType === currType
                ? 'bg-primary text-background pointer-events-none'
                : 'hover:bg-primary hover:text-background',
            )}
          >
            {t(`types.${projectType}`)}
          </Link>
        ))}
      </div>

      <H2>{t(`types.${currType}`)}</H2>

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects locale={locale} type={currType} />
      </Suspense>
    </section>
  )
}
