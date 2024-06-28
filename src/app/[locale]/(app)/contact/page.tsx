import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import ContactForm from '@/components/contact-form'

import type { TLocale } from '../../../../types/custom'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Contact' })

  return {
    title: t('metadata.title'),
    description: t('metadata.desc'),
  }
}

export default function Contact() {
  return (
    <main className='container mb-8 mt-16'>
      <ContactForm />
    </main>
  )
}
