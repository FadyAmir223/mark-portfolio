import type { Project } from '@prisma/client'

const prefixMap = new Map<string, number>()

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  .split('')
  .forEach((char, index) => {
    prefixMap.set(char, index)
  })

type Arg = {
  order: Project['order']
}

export function fractionIndexCompare(itemA: Arg, itemB: Arg): number {
  const [{ order: a }, { order: b }] = [itemA, itemB]

  const [baseA, baseB] = [a.match(/^[a-zA-Z]/)?.[0], b.match(/^[a-zA-Z]/)?.[0]]
  if (!baseA || !baseB) return 0

  const [indexA, indexB] = [prefixMap.get(baseA), prefixMap.get(baseB)]

  if (indexA !== undefined && indexB !== undefined) {
    if (indexA !== indexB) return indexA - indexB
  } else return 0

  return a.slice(1).localeCompare(b.slice(1))
}
