const SEARCH_PARAMS = {
  path: 'p',
  width: 'w',
  quality: 'q',
}

const assetEP = `/api/assets`

const ASSETS = {
  path: '/app/uploads',
  images: `${assetEP}/images`,
  videos: `${assetEP}/videos`,
}

const locales = ['en', 'ar'] as const

const projectTypes = ['commercial', 'residential'] as const

export { assetEP, ASSETS, locales, projectTypes, SEARCH_PARAMS }
