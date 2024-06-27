import { z } from 'zod'

export const contactSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email is required' })
    .max(100)
    .email()
    .toLowerCase(),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Message is required' })
    .max(50000),
})

export type ContactSchema = z.infer<typeof contactSchema>
