'use server'

import type { Contact } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

import { addMessage, deleteMessage } from '@/data/contact'
import { contactSchema } from '@/schema/contact'
import { isAuthenticated } from '@/utils/is-authenticated'

export async function sendMessage(formData: unknown) {
  const result = contactSchema.safeParse(formData)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { phone, message } = result.data

  const messageAdded = await addMessage(phone, message)
  if (messageAdded?.error) return { error: messageAdded.error }

  return { message: 'Message has been sent' }
}

export async function deleteContactMessage(id: Contact['id']) {
  if (
    (await isAuthenticated(
      headers().get('authorization') || headers().get('Authorization'),
    )) === false
  )
    return { error: 'Permission Denied' }

  const messageDeleted = await deleteMessage(id)
  if (messageDeleted?.error) return { error: messageDeleted.error }

  revalidatePath('/[locale]/admin/messages', 'page')
}
