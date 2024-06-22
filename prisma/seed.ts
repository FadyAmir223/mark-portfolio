/* eslint-disable no-console */

import { PrismaClient } from '@prisma/client'

// import data from './data.json'

const db = new PrismaClient()

async function main() {
  console.log()
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
