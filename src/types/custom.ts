import type { locales, projectTypes } from '@/utils/constants'

export type TLocale = (typeof locales)[number]
export type TProjectTypes = (typeof projectTypes)[number]
export type TProjects = { key: string; name: string; desc: string }[]
