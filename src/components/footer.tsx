import Image from 'next/image'
import { FaLocationDot, FaPhone } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

import logoIcon from '@/../public/images/logo.svg'
import type { TLocale } from '@/types/custom'
import { cn } from '@/utils/cn'

const contacts = [
  { text: 'Alexandria, Cairo, and Alamin', icon: FaLocationDot },
  { text: 'marksabry7395@gmail.com', icon: MdEmail },
  { text: '+201030065440 // +201277277230', icon: FaPhone },
]

type FooterProps = {
  locale: TLocale
}

export default function Footer({ locale }: FooterProps) {
  return (
    <footer className='mt-auto bg-background py-6'>
      <div className='container grid gap-y-10 md:grid-cols-2'>
        <div className='order-1 flex items-center justify-center md:order-none md:justify-start'>
          <div className='flex select-none items-center gap-x-2'>
            <Image
              src={logoIcon}
              alt='logo'
              className={cn('w-20', { 'order-1': locale === 'ar' })}
            />
            <p className='text-primary transition-opacity hover:opacity-85'>
              <span className='mr-1.5 text-3xl font-bold leading-9'>M</span>
              <span className='text-[1.1875rem] font-medium tracking-wider'>
                ARC
              </span>
            </p>
          </div>
        </div>

        <ul className='space-y-4'>
          {contacts.map(({ text, icon: Icon }) => (
            <li
              key={text}
              className='flex items-center justify-center gap-x-2 md:justify-start'
            >
              <Icon className='size-5 text-primary' />
              <span className='font-semibold tracking-wide'>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
