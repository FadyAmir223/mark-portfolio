import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaBuildingWheat } from 'react-icons/fa6'

import type { TLocale } from '@/types/custom'
import { cn } from '@/utils/cn'

const navs = [
  { label: 'home', url: '/', icon: AiFillHome },
  { label: 'projects', url: '/projects/commercial', icon: FaBuildingWheat },
  { label: 'contact', url: '/contact', icon: FaPhoneSquareAlt },
]

type NavBarProps = {
  locale: TLocale
  className?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function NavBar({ locale, className, setOpen }: NavBarProps) {
  const t = useTranslations('Header')
  const navLabels = t.raw('nav')

  return (
    <nav className={cn('items-center', className)}>
      <ul className='flex flex-wrap items-center gap-x-10'>
        {navs.map(({ label, url, icon: Icon }, index) => (
          <li key={label}>
            <Link
              href={`/${locale}/${url}`}
              className='flex items-center gap-x-1 text-lg tracking-wide transition-opacity hover:opacity-85'
              onClick={setOpen ? () => setOpen(false) : undefined}
            >
              <Icon className='size-5 text-primary' />
              {navLabels[index]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
