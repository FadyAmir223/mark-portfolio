'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/cn'

const routes = [
  { label: 'Upload Project', url: 'upload' },
  { label: 'Manage Projects', url: 'projects' },
  { label: 'See Messages', url: 'messages' },
]

export default function AdminNav() {
  const pathname = usePathname()
  const segment = pathname.split('/').at(-1)

  return routes.map(({ label, url }) => (
    <Link
      key={url}
      href={`/en/admin/${url}`}
      className={cn(
        'rounded-md bg-zinc-700 px-4 py-2 transition-colors hover:bg-zinc-700/80',
        { 'bg-zinc-700/40': segment === url },
      )}
    >
      {label}
    </Link>
  ))
}
