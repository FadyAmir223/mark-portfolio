import type { Dispatch, SetStateAction } from 'react'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

import { cn } from '@/utils/cn'

import I18nButton from './i18n-button'

const social = [
  {
    label: 'visit our page on facebook',
    url: 'https://www.facebook.com/M.architect2018',
    icon: FaFacebookF,
    color: {
      text: 'group-hover:text-facebook',
      border: 'hover:border-facebook',
    },
  },
  {
    label: 'visit our page on instagram',
    url: 'https://www.instagram.com/m_arc_2013/?hl=en',
    icon: FaInstagram,
    color: {
      text: 'group-hover:text-instagram',
      border: 'hover:border-instagram',
    },
  },
  {
    label: 'contact us on whatsapp',
    url: 'https://wa.me/+201030065440',
    icon: FaWhatsapp,
    color: {
      text: 'group-hover:text-whatsapp',
      border: 'hover:border-whatsapp',
    },
  },
]

type SocialProps = {
  className?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export default function Social({ className, setOpen }: SocialProps) {
  return (
    <div
      className={cn(
        'items-center gap-x-4 justify-between lg:justify-normal',
        className,
      )}
    >
      <ul className='flex items-center gap-x-3'>
        {social.map(({ label, url, icon: Icon, color }) => (
          <li key={url}>
            <a
              href={url}
              target='_blank'
              aria-label={label}
              className={cn(
                'group block rounded-full border-2 border-primary p-1 transition-opacity',
                color.border,
              )}
              onClick={setOpen ? () => setOpen(false) : undefined}
            >
              <Icon
                className={cn('size-[1.125rem] text-primary', color.text)}
              />
            </a>
          </li>
        ))}
      </ul>

      <I18nButton />
    </div>
  )
}
