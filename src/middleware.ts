import createMiddleware from 'next-intl/middleware'

import { locales } from './utils/constants'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icon.ico).*)'],
}
