import { unstable_setRequestLocale } from 'next-intl/server'

import UploadForm from '@/components/admin/upload-form'
import type { TLocale } from '@/types/custom'

export default function UploadProject({
  params: { locale },
}: Readonly<{
  params: { locale: TLocale }
}>) {
  unstable_setRequestLocale(locale)

  return <UploadForm />
}
