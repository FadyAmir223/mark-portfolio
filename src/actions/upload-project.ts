'use server'

import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { revalidatePath } from 'next/cache'
import sharp from 'sharp'

import { addProject } from '@/data/project'
import { ASSETS } from '@/utils/constants'

export async function uploadProject(formData: FormData) {
  const data = {
    type: formData.get('type')!,
    locales: {
      en: {
        title: formData.get('locale.en.title')!,
        description: formData.get('locale.en.description')!,
      },
      ar: {
        title: formData.get('locale.ar.title')!,
        description: formData.get('locale.ar.description')!,
      },
    },
    images: formData.getAll('images'),
    video: formData.get('video'),
  }

  const name = encodeURIComponent(data.locales.en.title as string)

  const additionResponse = await addProject({
    name,
    type: data.type,
    locales: data.locales,
    imagesLength: data.images.length,
  })
  if (additionResponse?.error) return { error: additionResponse.error }

  const writePath = `${ASSETS.path}/projects/${(data.type as string).toLowerCase()}/${name}`

  const imagesPath = `${writePath}/images`

  if (!existsSync(imagesPath)) await mkdir(imagesPath, { recursive: true })

  data.images.forEach(async (image, index) => {
    const imageBuffer = Buffer.from(await (image as File).arrayBuffer())
    const webpImage = sharp(imageBuffer).webp()
    await writeFile(`${imagesPath}/${index + 1}.webp`, webpImage)
  })

  await writeFile(
    `${writePath}/${name}.mp4`,
    Buffer.from(await (data.video as File).arrayBuffer()),
  )

  revalidatePath('/[locale]/(app)/projects/[type]', 'page')

  return { message: 'Project has bee uploaded' }
}
