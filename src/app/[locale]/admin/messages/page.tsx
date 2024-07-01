import { unstable_setRequestLocale } from 'next-intl/server'

import { deleteContactMessage } from '@/actions/messages'
import TrashButton from '@/components/admin/trash-button'
import { getMessages } from '@/data/contact'
import type { TLocale } from '@/types/custom'

export default async function Messages({
  params: { locale },
}: Readonly<{
  params: { locale: TLocale }
}>) {
  unstable_setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <ul className='space-y-4'>
      {messages.map(({ id, phone, message }) => (
        <li
          key={id}
          className='flex items-center rounded-md border-2 border-primary bg-background p-4'
        >
          <div className='grow'>
            <h5 className='mb-3 text-lg font-semibold'>{phone}</h5>
            <p className=''>{message}</p>
          </div>

          <TrashButton id={id} submitServer={deleteContactMessage} />
        </li>
      ))}
    </ul>
  )
}
