import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

import Header from '@/components/header/header'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/utils/cn'
import { locales } from '@/utils/constants'

import type { TLocale } from '../../types/custom'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
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
    image: '/images/logo-full.webp',
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
      locale,
      siteName: meta.title,
      type: 'website',
      images: [{ url: meta.image }],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: meta.image,
      card: 'summary_large_image',
    },
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
  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={cn(
          roboto.className,
          "flex min-h-screen flex-col bg-[url('/images/background.webp')] bg-[#22272D] bg-cover bg-fixed text-[#F1F1F1]",
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
