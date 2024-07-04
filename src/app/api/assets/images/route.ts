import { createReadStream, existsSync } from 'fs'
import fs from 'fs/promises'
import mime from 'mime'
import { type NextRequest, NextResponse } from 'next/server'
import path from 'path'
import sharp from 'sharp'

import { ASSETS, SEARCH_PARAMS } from '@/utils/constants'

/**
 * TODO
 *
 * take this new image, "tags" it (via URL or image hash), and stores that tag in its cache
 * serve this newly created image over its Edge network (CDN)
 *
 * find the image in its cache and serves via CDN without doing anything else
 */

export async function GET(request: NextRequest) {
  const assetPath = request.nextUrl.searchParams.get(SEARCH_PARAMS.path)
  const width = +(request.nextUrl.searchParams.get(SEARCH_PARAMS.width) || 0)
  const quality = +(
    request.nextUrl.searchParams.get(SEARCH_PARAMS.quality) || 75
  )

  if (!assetPath)
    return NextResponse.json({ error: 'Path is missing' }, { status: 400 })

  const originalPath = `${ASSETS.path}/${assetPath}`

  if (!existsSync(originalPath))
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })

  const mimeType = mime.getType(originalPath)

  if (!mimeType)
    return NextResponse.json({ error: 'Mime not found' }, { status: 404 })

  const headers = new Headers(request.headers)
  headers.set('Content-Type', mimeType)

  const dirPath = path.dirname(assetPath)
  const imageName = path.parse(assetPath).name

  const cachedPath = `${ASSETS.path}/${dirPath}/${imageName}-w${width}-q${quality}.webp`

  if (existsSync(cachedPath))
    // @ts-ignore
    return new Response(createReadStream(cachedPath), { headers })

  try {
    const imageBuffer = await fs.readFile(originalPath)

    let image = sharp(imageBuffer).webp({ quality })
    if (width > 0) image = image.resize({ width })

    await image.toFile(cachedPath)

    return new Response(await image.toBuffer(), { headers })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process the image' },
      { status: 500 },
    )
  }
}
