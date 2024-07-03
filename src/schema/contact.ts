import { z } from 'zod'

export const contactSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, { message: 'Phone Number is required' })
    .min(8, { message: 'Phone Number must be at least 8 digits' })
    .max(20, { message: "Phone Number can't exceed 20 digit" })
    .toLowerCase(),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Message is required' })
    .max(50000),
})

export type ContactSchema = z.infer<typeof contactSchema>
