import createMiddleware from 'next-intl/middleware'

import { locales } from './utils/constants'

export default createMiddleware({
  locales,
  defaultLocale: 'en',
})

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
