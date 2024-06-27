import { useTranslations } from 'next-intl'

import H1 from '@/components/h1'

export default function ProjectLayout({
  children,
}: {
  children: Readonly<React.ReactNode>
}) {
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
