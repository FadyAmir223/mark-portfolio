import Image from 'next/image'
import Link from 'next/link'

import logoIcon from '@/../public/images/logo.svg'

import DropdownMenu from './dropdown-menu'
import NavBar from './nav-bar'
import Social from './social'

export default function Header() {
  return (
    <header className='relative bg-[#1d1f2085] py-3'>
      <div className='container flex items-center justify-between'>
        <div className='flex gap-x-14'>
          <Link href='/' className='flex items-center gap-x-2.5'>
            <Image src={logoIcon} alt='logo' className='w-28' />
            <p className='text-primary transition-opacity hover:opacity-85'>
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
