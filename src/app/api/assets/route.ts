/*
  pros:
    free for self hosting
    can be used for protected assets

  cons:
    opt out of next.js image optimization
    so width and quality need to be implemented manually and cached

  solution:
    third party CDN
    or vercel (not really a solution)
*/

import { createReadStream, existsSync } from 'fs'
import mime from 'mime'
import { type NextRequest, NextResponse } from 'next/server'

import { SEARCH_PARAMS } from '@/utils/constants'

export async function GET(request: NextRequest) {
  const assetPath = request.nextUrl.searchParams.get(SEARCH_PARAMS.path)

  if (!assetPath || !existsSync(assetPath))
    return NextResponse.json({}, { status: 404 })

  const mimeType = mime.getType(assetPath)
  if (!mimeType) return NextResponse.json({}, { status: 404 })

  const responseHeader = new Headers(request.headers)
  responseHeader.set('Content-Type', mimeType)

  const stream = createReadStream(assetPath)
  // @ts-ignore
  return new Response(stream, { headers: responseHeader })
}
