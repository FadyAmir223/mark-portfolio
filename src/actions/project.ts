'use server'

import type { Project, Type } from '@prisma/client'
import { existsSync } from 'fs'
import { mkdir, rm, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import sharp from 'sharp'

import { addProject, deleteProject } from '@/data/project'
import { ASSETS, locales } from '@/utils/constants'
import { isAuthenticated } from '@/utils/is-authenticated'

export async function uploadProject(formData: FormData) {
  if (
    (await isAuthenticated(
      headers().get('authorization') || headers().get('Authorization'),
    )) === false
  )
    return { error: 'Permission Denied' }

  const data = {
    type: formData.get('type') as Type,
    locales: {
      en: {
        title: formData.get('locale.en.title') as string,
        description: formData.get('locale.en.description') as string,
      },
      ar: {
        title: formData.get('locale.ar.title') as string,
        description: formData.get('locale.ar.description') as string,
      },
    },
    images: formData.getAll('images') as File[],
    video: formData.get('video') as File,
  }

  if (data.images[0].size === 0) data.images.length = 0

  const name = encodeURIComponent(data.locales.en.title)

  const writePath = `${ASSETS.path}/projects/${data.type.toLowerCase()}/${name}`

  const imagesPath = `${writePath}/images`

  if (!existsSync(imagesPath)) await mkdir(imagesPath, { recursive: true })

  data.images?.forEach(async (image, index) => {
    const imageBuffer = Buffer.from(await image.arrayBuffer())
    const webpImage = sharp(imageBuffer).webp()
    await writeFile(`${imagesPath}/${index + 1}.webp`, webpImage)
  })

  if (data.video)
    await writeFile(
      `${writePath}/${name}.mp4`,
      Buffer.from(await data.video.arrayBuffer()),
    )

  const additionResponse = await addProject({
    name,
    type: data.type,
    locales: data.locales,
    imagesLength: data.images?.length,
    video: data.video.size ? `${name}.mp4` : undefined,
  })
  if (additionResponse?.error) return { error: additionResponse.error }

  const type = data.type.toLowerCase()
  locales.forEach((locale) => {
    revalidatePath(`/${locale}/projects/${type}`, 'page')
  })

  return { message: 'Project has bee uploaded' }
}

export async function deleteAdminProject(id: Project['id']) {
  if (
    (await isAuthenticated(
      headers().get('authorization') || headers().get('Authorization'),
    )) === false
  )
    return { error: 'Permission Denied' }

  const projectDeleted = await deleteProject(id)
  if ('error' in projectDeleted) return { error: projectDeleted.error }

  const { name, type } = projectDeleted
  const typeL = type.toLowerCase()

  const deletePath = `${ASSETS.path}/projects/${typeL}/${name}`
  await rm(deletePath, { recursive: true, force: true })

  revalidatePath('/[locale]/admin/projects', 'page')

  locales.forEach((locale) => {
    revalidatePath(`/${locale}/projects/${typeL}`, 'page')
  })
}
