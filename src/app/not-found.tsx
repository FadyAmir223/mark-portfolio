import type { Metadata } from 'next'
import Image from 'next/image'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import notFoundImg from '@/../public/assets/images/not-found.webp'
import Footer from '@/components/footer'
import Header from '@/components/header/header'

export const metadata: Metadata = {
  title: 'Not Found',
  description: "This Page Doesn't exist",
}

export default async function NotFound() {
  const locale = 'en'

  unstable_setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className='scrollbar scrollbar-track-background scrollbar-thumb-[#f0bb0f85] scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-2.5'
    >
      <body className="flex min-h-screen flex-col bg-[#22272D] bg-[url('/images/background.webp')] bg-cover bg-fixed text-[#F1F1F1]">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <div className='container flex grow items-center justify-center'>
            <Image
              src={notFoundImg}
              alt='Not Found'
              className='w-full md:w-4/5 lg:w-3/5'
              sizes='100vw'
              priority
            />
          </div>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
