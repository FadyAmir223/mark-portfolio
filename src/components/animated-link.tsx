'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

import useIsMedium from '@/hooks/use-is-small'

export type ExtendedDocument = Document & {
  startViewTransition?: (callback: () => void) => void
}

type Props = React.ComponentPropsWithoutRef<typeof Link>

export default function AnimatedLink({ href, children, ...props }: Props) {
  const router = useRouter()
  const isMedium = useIsMedium()

  const animatedRoute = (url: string) => {
    const extendedDocument = document as ExtendedDocument
    if (!extendedDocument.startViewTransition || isMedium)
      return router.push(url)
    extendedDocument.startViewTransition(() => router.push(url))
  }

  return (
    <Link
      href={href}
      passHref
      onClick={() => animatedRoute(href as string)}
      {...props}
    >
      {children}
    </Link>
  )
}
