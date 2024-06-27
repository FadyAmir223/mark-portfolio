import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import H1 from '@/components/h1'
import Projects from '@/components/projects/projects'
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

export default function ProjectType({ params }: ProjectTypeProps) {
  const t = useTranslations('Projects')

  const result = projectTypeSchema.safeParse(params.type)
  if (!result.success) notFound()

  const currType = result.data

  return (
    <section>
      <div className='mx-auto mb-8 flex w-fit gap-x-3'>
        {projectTypes.map((type) => (
          <Link
            key={type}
            href={`/${params.locale}/projects/${type}`}
            className={cn(
              'inline-block rounded-md border border-primary px-4 py-2 font-semibold capitalize text-primary shadow-sm transition-colors hover:bg-primary hover:text-background',
              type === currType
                ? 'bg-primary text-background pointer-events-none'
                : 'hover:bg-primary hover:text-background',
            )}
          >
            {t(`types.${type}`)}
          </Link>
        ))}
      </div>

      <H1>{t(`types.${currType}`)}</H1>

      <Suspense fallback={<div>loading...</div>}>
        <Projects locale={params.locale} type={currType} />
      </Suspense>
    </section>
  )
}
