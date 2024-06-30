import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'

type H2Props = {
  children: ReactNode
  className?: string
}

export default function H2({ children, className }: H2Props) {
  return (
    <h2
      className={cn(
        'relative mb-10 pb-1 text-center text-[2rem] font-bold text-primary before:absolute before:left-1/2 before:top-full before:h-0.5 before:w-28 before:-translate-x-1/2 before:bg-primary',
        className,
      )}
    >
      {children}
    </h2>
  )
}
