import Footer from '@/components/footer'

import type { TLocale } from '../../../types/custom'

export default function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: TLocale }
}>) {
  return (
    <>
      {children}
      <Footer locale={locale} />
    </>
  )
}
