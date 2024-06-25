import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

import { cn } from '@/utils/cn'

import I18nButton from './i18n-button'

const social = [
  {
    label: 'visit our page on facebook',
    url: 'https://facebook.com',
    icon: FaFacebookF,
  },
  {
    label: 'visit our page on instagram',
    url: 'https://instagram.com',
    icon: FaInstagram,
  },
  {
    label: 'contact us on whatsapp',
    url: 'https://wa.me/+201030065440?text=more-details',
    icon: FaWhatsapp,
  },
]

type SocialProps = {
  className?: string
}

export default function Social({ className }: SocialProps) {
  return (
    <div
      className={cn(
        'items-center gap-x-4 justify-between lg:justify-normal',
        className,
      )}
    >
      <ul className='flex items-center gap-x-3'>
        {social.map(({ label, url, icon: Icon }) => (
          <li key={url}>
            <a
              href={url}
              target='_blank'
              aria-label={label}
              className='group block rounded-full border-2 border-primary p-1 transition-opacity hover:opacity-80'
            >
              <Icon className='size-[1.125rem] text-primary' />
            </a>
          </li>
        ))}
      </ul>

      <I18nButton />
    </div>
  )
}
