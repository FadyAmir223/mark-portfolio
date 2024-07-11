import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server'

import Header from '@/components/header/header'
import { Toaster } from '@/components/ui/toaster'
import { env } from '@/lib/env'
import type { TLocale } from '@/types/custom'
import { cn } from '@/utils/cn'
import { locales } from '@/utils/constants'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'RootLayout' })

  const meta = {
    title: 'M arc',
    description: t('metadata.desc'),
    image: '/assets/images/logo-full.webp',
  }

  return {
    title: {
      default: meta.title,
      template: '%s | M arc',
    },
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: env.NEXT_PUBLIC_SITE_URL,
      locale: { en: 'en_US', ar: 'ar_EG' }[locale],
      siteName: meta.title,
      type: 'website',
      images: [
        {
          url: env.NEXT_PUBLIC_SITE_URL + meta.image,
          alt: `${meta.title} logo`,
          width: 900,
          height: 1050,
        },
      ],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: env.NEXT_PUBLIC_SITE_URL + meta.image,
      card: 'summary_large_image',
      creator: '@marc_eg',
    },
    alternates: {
      canonical: env.NEXT_PUBLIC_SITE_URL,
      languages: {
        'en-US': `${env.NEXT_PUBLIC_SITE_URL}/en`,
        'ar-EG': `${env.NEXT_PUBLIC_SITE_URL}/ar`,
      },
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
    },
    assets: `${env.NEXT_PUBLIC_SITE_URL}/assets`,
    category: 'Architecture and Construction',
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: TLocale }
}>) {
  unstable_setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className='scrollbar scrollbar-track-background scrollbar-thumb-[#f0bb0f85] scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-w-2.5'
    >
      <body
        className={cn(
          roboto.className,
          'flex min-h-screen flex-col bg-[#22272D] text-[#F1F1F1] overflow-x-hidden',
          process.env.NODE_ENV === 'development' && 'debug-screens',
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
        </NextIntlClientProvider>

        <Toaster />
      </body>
    </html>
  )
}
