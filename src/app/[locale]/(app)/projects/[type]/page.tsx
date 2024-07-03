import type { Metadata } from 'next'
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
      <H2>{t(`types.${currType}`)}</H2>

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects locale={locale} type={currType} />
      </Suspense>
    </section>
  )
}
