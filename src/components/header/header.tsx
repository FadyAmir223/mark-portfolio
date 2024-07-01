import Image from 'next/image'
import Link from 'next/link'

import logoIcon from '@/../public/assets/images/logo.svg'
import { cn } from '@/utils/cn'

import type { TLocale } from '../../types/custom'
import DropdownMenu from './dropdown-menu'
import NavBar from './nav-bar'
import Social from './social'

type HomeProps = {
  locale: TLocale
}

export default function Header({ locale }: HomeProps) {
  return (
    <header className='relative bg-[#1d1f2099] py-3'>
      <div className='container flex items-center justify-between'>
        <div className='flex gap-x-14'>
          <Link href='/' className='flex select-none gap-x-3.5 text-left'>
            <Image
              src={logoIcon}
              alt='logo'
              className={cn('w-28', { 'order-1': locale === 'ar' })}
              priority
            />
            <p className='self-end text-primary transition-opacity hover:opacity-85'>
              <span className='mr-2 text-[2.125rem] font-bold leading-9'>
                M
              </span>
              <span className='text-xl font-medium tracking-wider'>ARC</span>
            </p>
          </Link>

          <NavBar className='hidden md:flex' />
        </div>

        <Social className='hidden lg:flex' />

        <DropdownMenu />
      </div>
    </header>
  )
}
