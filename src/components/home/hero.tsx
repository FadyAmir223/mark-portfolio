'use client'

import { domAnimation, LazyMotion, m } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Puff } from 'react-loader-spinner'

import markPic from '@/../public/assets/images/mark-pic.webp'
import type { TLocale } from '@/types/custom'

export default function Hero({ locale }: { locale: TLocale }) {
  const t = useTranslations('Home.hero')

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          className='text-center'
          initial={{ opacity: 0, x: 200 * (locale === 'en' ? -1 : 1) }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className='mb-6 text-[2rem] font-bold leading-9 tracking-wider'>
            {t('title')}
          </h1>
          <p className='max-w-[750px] sm:text-xl sm:leading-8 sm:tracking-wide'>
            {t('desc')}
          </p>
        </m.div>
      </LazyMotion>

      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, x: 200 * (locale === 'en' ? 1 : -1) }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='relative'>
            <Puff visible height='340' width='340' color='#f0bc11' />

            <Image
              src={markPic}
              alt='Mark Picture'
              className='absolute left-1/2 top-1/2 -mt-2 ml-1 h-[285px] -translate-x-1/2 -translate-y-1/2 object-contain'
            />
          </div>

          <p className='mb-2 mt-3 text-center text-2xl font-semibold tracking-wide text-primary'>
            CEO: Arch/Mark Sabry
          </p>
        </m.div>
      </LazyMotion>
    </>
  )
}
