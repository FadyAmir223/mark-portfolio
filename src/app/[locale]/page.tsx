import type { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import markPic from '@/../public/images/mark-pic.webp'
import { Puff } from '@/components/home/buff'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: 'en' | 'ar' }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Home' })

  return {
    title: t('metadata.title'),
    description: t('metadata.desc'),
  }
}

type HomeProps = {
  params: {
    locale: 'en' | 'ar'
  }
}

export default function Home({ params: { locale } }: HomeProps) {
  const t = useTranslations('Home')

  return (
    <main className='container mt-16 min-h-[calc(100dvh-88px)]'>
      {/* hero */}
      {/* TODO: loading animation */}
      <div className='flex flex-col items-center justify-between gap-y-10 md:flex-row'>
        <div className='text-center'>
          <h1 className='mb-6 text-[2rem] font-bold leading-9 tracking-wider'>
            {t('hero.title')}
          </h1>
          <p className='max-w-[750px] sm:text-xl sm:leading-8 sm:tracking-wide'>
            {t('hero.desc')}
          </p>
        </div>

        <div className=''>
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
        </div>
      </div>

      {/* decoration styles */}
      <div className='pb-12 pt-28'>
        <h2 className='relative mb-10 pb-1 text-center text-[2rem] font-bold text-primary before:absolute before:left-1/2 before:top-full before:h-0.5 before:w-28 before:-translate-x-1/2 before:bg-primary'>
          {t('decorations.title')}
        </h2>

        <ul className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {(
            t.raw('decorations.types') as {
              key: string
              name: string
              desc: string
            }[]
          ).map(({ key, name, desc }) => {
            const styleWord =
              locale === 'en'
                ? `${name} ${t('decorations.style')}`
                : `${t('decorations.style')} ${name}`

            return (
              <li
                key={key}
                className='group relative h-[230px] overflow-hidden rounded-md border-2 border-primary transition-transform duration-500 hover:scale-105 sm:h-[275px] md:h-[315px] lg:h-[410px]'
              >
                <Image
                  src={`/images/style-types/${key.replace(' ', '-')}.webp`}
                  alt={styleWord}
                  fill
                  className='object-cover'
                  sizes='(min-width: 768px) 50vw, 100vw'
                />

                <div className='absolute inset-0 -translate-y-full overflow-hidden bg-[#f8d7da95] p-2 text-center text-black transition-transform duration-500 group-hover:translate-y-0'>
                  <h5 className='mb-1 text-lg font-bold sm:mb-2 sm:text-xl md:text-[1.375rem] lg:text-3xl'>
                    {styleWord}
                  </h5>
                  <p className='text-[0.9375rem] sm:text-lg md:text-[0.9375rem] md:!leading-[1.125rem] lg:!leading-6'>
                    {desc}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
