import type { Dispatch, SetStateAction } from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../ui/button'

type BurgerIconProps = {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function BurgerIcon({ isOpen, setOpen }: BurgerIconProps) {
  return (
    <Button
      className='block scale-110 lg:hidden'
      variant='none'
      size='none'
      onClick={() => setOpen(!isOpen)}
    >
      <div className='group relative h-[15px] w-5 cursor-pointer'>
        <span
          className={cn(
            'absolute left-0 h-[1.5px] w-full bg-primary duration-150 ease-linear',
            isOpen ? 'top-[6px] rotate-45' : ' top-0',
          )}
        />
        <span
          className={cn(
            'absolute left-0 top-[6px] h-[1.5px] w-full bg-primary duration-150 ease-linear',
            { hidden: isOpen },
          )}
        />
        <span
          className={cn(
            'absolute left-0 h-[1.5px] w-full bg-primary duration-150 ease-linear',
            isOpen ? 'top-[6px] -rotate-45' : 'top-[13px]',
          )}
        />
      </div>
    </Button>
  )
}
