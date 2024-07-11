import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import AnimatedLink from '@/components/animated-link'
import H2 from '@/components/h2'
import StyleDropdown from '@/components/projects/style-dropdown'
import type { TLocale, TProjects } from '@/types/custom'

export const metadata: Metadata = {
  title: 'Decoration Styles',
  description: 'Choose Your Preferred Style',
}

type StylesProps = {
  params: {
    locale: TLocale
  }
}

export default function Styles({ params: { locale } }: StylesProps) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('Styles')

  return (
    <div className='container py-12'>
      <H2>{t('title')}</H2>

      <div className='' />

      <ul className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {(t.raw('types') as TProjects).map(({ key, name, desc }) => {
          const styleWord =
            locale === 'en' ? `${name} ${t('style')}` : `${t('style')} ${name}`

          return (
            <AnimatedLink
              key={key}
              href={`/${locale}/styles/${key}`}
              className='group relative aspect-[971/692] overflow-hidden rounded-md border-2 border-primary transition-transform duration-500 hover:scale-105'
            >
              <Image
                src={`/assets/images/style-types/${key.replace(' ', '-')}.webp`}
                alt={styleWord}
                fill
                className='object-cover'
                sizes='(min-width: 768px) 50vw, 100vw'
                style={{ viewTransitionName: `style-image-${key}` }}
              />

              <StyleDropdown className='absolute inset-0 -translate-y-full overflow-hidden bg-[#f8d7da95] p-2 text-center text-black transition-transform duration-500 fill-mode-forwards group-hover:translate-y-0 lg:text-start'>
                <span
                  className='mb-1 block text-center text-lg font-bold sm:mb-2 sm:text-xl md:text-[1.375rem] lg:text-3xl'
                  style={{ viewTransitionName: `style-title-${key}` }}
                >
                  {styleWord}
                </span>
                <p
                  className='md:text-lg lg:text-xl lg:leading-8'
                  style={{ viewTransitionName: `style-desc-${key}` }}
                >
                  {desc}
                </p>
              </StyleDropdown>
            </AnimatedLink>
          )
        })}
      </ul>
    </div>
  )
}
