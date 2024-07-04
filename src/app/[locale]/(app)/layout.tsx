import Image from 'next/image'
import { unstable_setRequestLocale } from 'next-intl/server'

import background from '@/../public/assets/images/background.webp'
import Footer from '@/components/footer'
import type { TLocale } from '@/types/custom'

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: TLocale }
}>) {
  unstable_setRequestLocale(locale)

  // TODO: google analytics

  return (
    <>
      <div className='fixed -z-10 size-full'>
        <Image
          src={background}
          alt='background'
          className='object-cover'
          placeholder='blur'
          quality={100}
          sizes='100vw'
          fill
        />
      </div>

      {children}
      <Footer locale={locale} />
    </>
  )
}
