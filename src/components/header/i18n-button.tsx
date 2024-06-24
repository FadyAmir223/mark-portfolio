'use client'

// import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/router'

import { Button } from '../ui/button'

// TODO: i18n

export default function I18nButton() {
  // const { push } = useRouter()
  // const pathname = usePathname()

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={() => {
        // push(`/(en|ar)/${pathname.slice(3)}`)
      }}
    >
      AR
    </Button>
  )
}
