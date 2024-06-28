'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Puff } from 'react-loader-spinner'

import markPic from '@/../public/images/mark-pic.webp'
import type { TLocale } from '@/types/custom'

export default function Hero({ locale }: { locale: TLocale }) {
  const t = useTranslations('Home.hero')

  return (
    <>
      <motion.div
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 200 * (locale === 'en' ? 1 : -1) }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className='relative'>
          <Puff visible height='340' width='340' color='#f0bc11' />

          <Image
            src={markPic}
            alt='Mark Picture'
            className='absolute left-1/2 top-1/2 -mt-3 ml-1.5 h-[300px] -translate-x-1/2 -translate-y-1/2 object-contain'
          />
        </div>

        <h3 className='mb-2 mt-3 text-center text-2xl font-semibold tracking-wide text-primary'>
          CEO: Arch/Mark Sabry
        </h3>
      </motion.div>
    </>
  )
}
