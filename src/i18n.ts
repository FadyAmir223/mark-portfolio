import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { z } from 'zod'

import { locales } from './utils/constants'

const localeSchema = z.enum(locales)

export default getRequestConfig(async ({ locale }) => {
  const result = localeSchema.safeParse(locale)
  if (!result.success) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
