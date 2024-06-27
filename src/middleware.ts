import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import type { TLocale } from './types/custom'
import { locales } from './utils/constants'

export default async function middleware(request: NextRequest) {
  // no need to over complicate
  const defaultLocale = (request.headers.get('X-locale') || 'en') as TLocale

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  })
  const response = handleI18nRouting(request)

  response.headers.set('X-locale', defaultLocale)

  // TODO: redirect /projects to projects/commercial & /admin to /admin/upload

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icon.ico).*)'],
}
