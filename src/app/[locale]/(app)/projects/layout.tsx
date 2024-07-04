import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import H2 from '@/components/h2'
import StylesNav from '@/components/projects/styles-nav'
import type { TLocale } from '@/types/custom'

export default function ProjectLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: TLocale }
}>) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Projects')

  return (
    <main className='container mt-16'>
      <div className='mb-12 text-center'>
        <H2 className='mb-4'>{t('title')}</H2>
        <p className='sm:text-lg md:text-xl'>{t('desc')}</p>
      </div>

      <div className='mx-auto mb-8 flex w-fit flex-wrap gap-x-3'>
        <StylesNav locale={locale} />
      </div>

      {children}
    </main>
  )
}
