import type { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import Hero from '@/components/home/hero'
import type { TLocale } from '@/types/custom'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' })

  return {
    title: t('metadata.title'),
    description: t('metadata.desc'),
  }
}

type HomeProps = {
  params: {
    locale: TLocale
  }
}

export default function Home({ params: { locale } }: HomeProps) {
  unstable_setRequestLocale(locale)

  return (
    <main className='container mt-16 min-h-[calc(100dvh-88px)]'>
      <div className='flex flex-col items-center justify-between gap-y-10 md:flex-row'>
        <Hero locale={locale} />
      </div>

      <video
        src='/assets/videos/advertisement.mp4'
        className='mx-auto mb-12 mt-16 max-h-[90dvh]'
        controls
      >
        <track kind='captions' />
      </video>
    </main>
  )
}
