'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function I18nButton() {
  const pathname = usePathname()

  const locale = pathname.split('/')[1] === 'en' ? 'ar' : 'en'

  return (
    <Link
      href={`/${locale}${pathname.slice(3)}`}
      className='rounded-md border border-primary px-1.5 py-0.5 text-sm uppercase text-primary shadow-sm transition-colors hover:bg-primary hover:text-background'
    >
      {locale}
    </Link>
  )
}
