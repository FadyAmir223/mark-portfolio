import { createReadStream, existsSync, statSync } from 'fs'
import mime from 'mime'
import { type NextRequest, NextResponse } from 'next/server'

import { ASSETS, SEARCH_PARAMS } from '@/utils/constants'

export async function GET(request: NextRequest) {
  const assetPath = request.nextUrl.searchParams.get(SEARCH_PARAMS.path)

  if (!assetPath)
    return NextResponse.json({ error: 'Path is missing' }, { status: 400 })

  const originalPath = `${ASSETS.path}/${assetPath}`

  if (!existsSync(originalPath))
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })

  const mimeType = mime.getType(originalPath)

  if (!mimeType)
    return NextResponse.json({ error: 'Mime not found' }, { status: 404 })

  const fileSize = statSync(originalPath).size
  const range = request.headers.get('range')

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1

    if (start >= fileSize || end >= fileSize)
      return NextResponse.json(
        {},
        { status: 416, headers: { 'Content-Range': `bytes */${fileSize}` } },
      )

    const headers = new Headers()
    headers.set('Content-Type', mimeType)
    headers.set('Content-Length', (end - start + 1).toString())
    headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`)
    headers.set('Accept-Ranges', 'bytes')

    const stream = createReadStream(originalPath, { start, end })
    // @ts-ignore
    return new Response(stream, { headers, status: 206 })
  }

  const headers = new Headers()
  headers.set('Content-Type', mimeType)
  headers.set('Content-Length', fileSize.toString())
  headers.set('Accept-Ranges', 'bytes')

  // @ts-ignore
  return new Response(createReadStream(originalPath), { headers })
}
