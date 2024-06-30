import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import type { TLocale } from '@/types/custom'
import { locales } from '@/utils/constants'
import { isAuthenticated } from '@/utils/is-authenticated'

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const match = pathname.match(/^\/(?:en|ar)\/?(admin|projects)\/?$/)

  if (match)
    request.nextUrl.pathname = `${pathname}/${
      match[1] === 'admin' ? 'upload' : 'commercial'
    }`

  if (
    request.nextUrl.pathname.slice(4, 9) === 'admin' &&
    (await isAuthenticated(
      request.headers.get('authorization') ||
        request.headers.get('Authorization'),
    )) === false
  ) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic',
      },
    })
  }

  // no need to over complicate
  const defaultLocale = (request.headers.get('X-Locale') || 'en') as TLocale

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  })
  const response = handleI18nRouting(request)

  response.headers.set('X-Locale', defaultLocale)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icon.ico).*)'],
}
