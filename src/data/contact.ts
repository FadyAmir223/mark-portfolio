import 'server-only'

import type { Contact } from '@prisma/client'

import db from '@/lib/db'

export async function addMessage(
  phone: Contact['phone'],
  message: Contact['message'],
) {
  try {
    await db.contact.create({
      data: { phone, message },
      select: { id: true },
    })
  } catch {
    return { error: 'Could not Send Message' }
  }
}

export async function getMessages() {
  try {
    return await db.contact.findMany()
  } catch {
    return []
  }
}

export async function deleteMessage(id: Contact['id']) {
  try {
    await db.contact.delete({
      where: { id },
      select: { id: true },
    })
  } catch {
    return { error: 'Could Not Delete Message' }
  }
}
