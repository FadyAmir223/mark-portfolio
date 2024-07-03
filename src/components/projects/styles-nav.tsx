'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import type { TLocale } from '@/types/custom'
import { cn } from '@/utils/cn'
import { projectTypes } from '@/utils/constants'

type StylesNavProps = {
  locale: TLocale
}

export default function StylesNav({ locale }: StylesNavProps) {
  const t = useTranslations('Projects.types')

  const type = usePathname().split('/').at(-1)

  return ['styles' as const, ...projectTypes].map((projectType) => (
    <Link
      key={projectType}
      href={`/${locale}/projects/${projectType}`}
      className={cn(
        'inline-block rounded-md text-center border border-primary px-4 py-2 font-semibold capitalize text-primary shadow-sm transition-colors hover:bg-primary hover:text-background',
        projectType === type
          ? 'bg-primary text-background pointer-events-none'
          : 'hover:bg-primary hover:text-background',
      )}
    >
      {t(projectType)}
    </Link>
  ))
}
