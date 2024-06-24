import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { FaBuildingWheat } from 'react-icons/fa6'

import { cn } from '@/utils/cn'

const navs = [
  { label: 'Home', url: '/', icon: AiFillHome },
  { label: 'Projects', url: '/projects/residential', icon: FaBuildingWheat },
  { label: 'Contact', url: '/contact', icon: FaPhoneSquareAlt },
]

type NavBarProps = {
  className?: string
}

export default function NavBar({ className }: NavBarProps) {
  return (
    <nav className={cn('items-center', className)}>
      <ul className='flex flex-wrap items-center gap-x-10'>
        {navs.map(({ label, url, icon: Icon }) => (
          <li key={label} className=''>
            <Link
              href={url}
              className='flex items-center gap-x-1 text-lg tracking-wide transition-opacity hover:opacity-85'
            >
              <Icon className='size-5 text-primary' />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
