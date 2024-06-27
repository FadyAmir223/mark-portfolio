import { z } from 'zod'

import { projectTypes } from '@/utils/constants'

export const projectTypeSchema = z.enum(projectTypes)

export type ProjectTypeSchema = z.infer<typeof projectTypeSchema>
