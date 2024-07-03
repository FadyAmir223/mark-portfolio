import type { Project } from '@prisma/client'

type Arg = {
  order: Project['order']
}

export function fractionIndexCompare({ order: a }: Arg, { order: b }: Arg) {
  const [codeA, codeB] = [a.charCodeAt(0), b.charCodeAt(0)]
  if (!codeA || !codeB) return 0
  if (codeA !== codeB) return codeA - codeB
  return a.slice(1).localeCompare(b.slice(1))
}
