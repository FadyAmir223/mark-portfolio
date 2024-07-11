'use client'

import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/utils/cn'

type StyleDropdownProps = ComponentPropsWithoutRef<'div'>

export default function StyleDropdown({
  children,
  className,
  ...props
}: StyleDropdownProps) {
  return (
    <div
      className={cn('opacity-0 group-hover:animate-appear', className)}
      onMouseLeave={(event) => {
        const e = event.currentTarget
        e.classList.remove('opacity-0')
        e.classList.add('opacity-100')

        setTimeout(() => {
          e.classList.remove('opacity-100')
          e.classList.add('opacity-0')
        }, 500)
      }}
      {...props}
    >
      {children}
    </div>
  )
}
