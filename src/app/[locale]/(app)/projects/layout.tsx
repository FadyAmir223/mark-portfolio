import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import H1 from '@/components/h1'
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
        <H1 className='mb-4'>{t('title')}</H1>
        <p className='sm:text-lg md:text-xl'>{t('desc')}</p>
      </div>

      {children}
    </main>
  )
}
