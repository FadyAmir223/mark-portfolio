import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'

import H2 from '@/components/h2'
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

      <ul className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {(t.raw('types') as TProjects).map(({ key, name, desc }) => {
          const styleWord =
            locale === 'en' ? `${name} ${t('style')}` : `${t('style')} ${name}`

          return (
            <Link
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
              />

              <div className='absolute inset-0 -translate-y-full overflow-hidden bg-[#f8d7da95] p-2 text-center text-black transition-transform duration-500 group-hover:translate-y-0'>
                <span className='mb-1 block text-lg font-bold sm:mb-2 sm:text-xl md:text-[1.375rem] lg:text-3xl'>
                  {styleWord}
                </span>
                <p className='text-[0.9375rem] sm:text-lg md:text-[0.9375rem] md:!leading-[1.125rem] lg:text-xl lg:!leading-[1.375rem]'>
                  {desc}
                </p>
              </div>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
