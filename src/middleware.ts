import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { env } from './lib/env'
import type { TLocale } from './types/custom'
import { locales } from './utils/constants'

async function encodePassword(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(password),
  )
  return Buffer.from(arrayBuffer).toString('base64')
}

async function isAuth(request: NextRequest) {
  const token =
    request.headers.get('authorization') || request.headers.get('Authorization')

  if (!token) return false

  const [username, password] = Buffer.from(token.split(' ')[1], 'base64')
    .toString()
    .split(':')

  return (
    username === env.ADMIN_USERNAME &&
    (await encodePassword(password)) === env.ADMIN_PASSWORD
  )
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const match = pathname.match(/^\/(?:en|ar)\/?(admin|projects)\/?$/)

  if (match)
    request.nextUrl.pathname = `${pathname}/${
      match[1] ? 'upload' : 'commercial'
    }`

  if (
    request.nextUrl.pathname.slice(4, 9) === 'admin' &&
    (await isAuth(request)) === false
  ) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic',
      },
    })
  }

  // no need to over complicate
  const defaultLocale = (request.headers.get('X-locale') || 'en') as TLocale

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
  })
  const response = handleI18nRouting(request)

  response.headers.set('X-locale', defaultLocale)

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icon.ico).*)'],
}
