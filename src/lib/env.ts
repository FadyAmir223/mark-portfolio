import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().trim().min(1).url(),
  },
  server: {
    DATABASE_URL: z.string().trim().min(1).url(),
    RESEND_API_KEY: z.string().trim().min(1),
    SENDER_EMAIL: z.string().trim().min(1).email().toLowerCase(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
  },
})
