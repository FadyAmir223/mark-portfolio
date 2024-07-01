/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */

import type { Locale, Project } from '@prisma/client'
import { PrismaClient } from '@prisma/client'

import data from './data.json'

const db = new PrismaClient()

async function main() {
  for (const [type, projects] of Object.entries(data.projects)) {
    for (const [projectName, projectData] of Object.entries(projects)) {
      await db.project.upsert({
        where: { name: projectName },
        update: {},
        create: {
          type: type as Project['type'],
          name: projectName,
          video: `${projectName}.mp4`,
          images: Array.from(
            { length: projectData.imageAmount },
            (_, i) => `${i + 1}.webp`,
          ),
          localized: {
            createMany: {
              data: Object.entries(projectData.locale).map(
                ([locale, { title, desc }]) => ({
                  title,
                  description: desc,
                  locale: locale as Locale,
                }),
              ),
            },
          },
        },
        select: { id: true },
      })

      console.log(`Added ${type}: ${projectName}`)
    }

    await db.contact.createMany({ data: data.contacts })
    console.log('Added: contacts')
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
