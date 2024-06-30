'use client'

import { useRef, useState } from 'react'

import BurgerIcon from './burger-icon'
import NavBar from './nav-bar'
import Social from './social'

export default function DropdownMenu() {
  const [isOpen, setOpen] = useState(false)
  const elDiv = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <BurgerIcon isOpen={isOpen} setOpen={setOpen} />

      <div
        className='absolute left-0 top-full z-10 h-36 w-full overflow-hidden bg-[#1d1f2085] duration-150 lg:hidden'
        ref={elDiv}
        style={{ height: isOpen ? elDiv.current?.scrollHeight : `${0}px` }}
      >
        <div className='container space-y-2 py-4'>
          <NavBar className='flex md:hidden' setOpen={setOpen} />
          <Social className='flex' setOpen={setOpen} />
        </div>
      </div>
    </>
  )
}
