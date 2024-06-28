import Link from 'next/link'
import { unstable_setRequestLocale } from 'next-intl/server'

import type { TLocale } from '@/types/custom'

const routes = [{ label: 'Upload Project', url: 'upload' }]

export default function AdminLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: TLocale }
}>) {
  unstable_setRequestLocale(locale)

  return (
    <main className='flex h-[calc(100vh-103px)]'>
      <aside className='h-full w-72 overflow-y-auto bg-background p-4'>
        <ul className='flex flex-col gap-y-2'>
          {routes.map(({ label, url }) => (
            <Link
              key={url}
              href={`/${locale}/admin/${url}`}
              className='rounded-md bg-zinc-700 px-4 py-2 transition-colors hover:bg-zinc-700/80'
            >
              {label}
            </Link>
          ))}
        </ul>
      </aside>

      <section className='flex-1 overflow-y-auto p-4'>{children}</section>
    </main>
  )
}
