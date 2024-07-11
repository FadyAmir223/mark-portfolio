import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import type { TLocale, TProjects } from '@/types/custom'

type StyleProps = {
  params: {
    locale: TLocale
    style: string
  }
}

export async function generateStaticParams({ params: { locale } }: StyleProps) {
  const t = await getTranslations({ locale, namespace: 'Styles' })

  const projects = t.raw('types') as TProjects
  return projects.map(({ key }) => ({ style: key }))
}

export async function generateMetadata({
  params: { locale, style },
}: StyleProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Styles' })

  const projects = t.raw('types') as TProjects
  const [{ name }] = projects.filter(({ key: k }) => k === style)

  const styleWord =
    locale === 'en' ? `${name} ${t('style')}` : `${t('style')} ${name}`

  return {
    title: styleWord,
  }
}

export default function Style({ params: { locale, style } }: StyleProps) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Styles')

  const projects = t.raw('types') as TProjects
  const [{ key, name, desc }] = projects.filter(({ key: k }) => k === style)

  const styleWord =
    locale === 'en' ? `${name} ${t('style')}` : `${t('style')} ${name}`

  return (
    <main className='container pb-12 pt-20'>
      <div className='flex flex-col-reverse gap-12 lg:flex-row'>
        <div className='relative aspect-[971/692] w-full overflow-hidden rounded-md md:mx-auto md:w-[600px] lg:mx-[reset] lg:w-[reset]'>
          <Image
            src={`/assets/images/style-types/${key.replace(' ', '-')}.webp`}
            alt={styleWord}
            fill
            className='object-cover'
            sizes='(min-width: 768px) 50vw, 100vw'
            priority
            style={{ viewTransitionName: `style-image-${key}` }}
          />
        </div>

        <div className='text-center md:mx-auto md:max-w-[600px] lg:mx-[reset] lg:w-1/2 lg:max-w-[reset] lg:text-start'>
          <h2
            className='mb-4 block text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl'
            style={{ viewTransitionName: `style-title-${key}` }}
          >
            {styleWord}
          </h2>
          <p
            className='md:text-lg lg:text-xl lg:leading-8'
            style={{ viewTransitionName: `style-desc-${key}` }}
          >
            {desc}
          </p>
        </div>
      </div>
    </main>
  )
}
