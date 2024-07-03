import { unstable_setRequestLocale } from 'next-intl/server'

import AdminNav from '@/components/admin/admin-nav'
import type { TLocale } from '@/types/custom'

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
        <ul className='flex flex-col gap-y-3'>
          <AdminNav />
        </ul>
      </aside>

      <section className='flex-1 overflow-y-auto p-4'>{children}</section>
    </main>
  )
}
