'use server'

import ReceiveMessage from '@/email/receive-message'
import { sendEmail } from '@/lib/resend'
import { contactSchema } from '@/schema/contact'

export async function sendAnEmail(formData: unknown) {
  const result = contactSchema.safeParse(formData)

  if (!result.success) {
    const errors = result.error.issues.reduce(
      (issues, issue) => ({ ...issues, [issue.path[0]]: issue.message }),
      {},
    )

    return { errors }
  }

  const { email, message } = result.data

  const sendEmailResponse = await sendEmail({
    to: 'marksabry7395@gmail.com',
    subject: 'Customer via your Portfolio',
    mail: {
      Component: ReceiveMessage,
      props: { email, message },
    },
  })
  if (sendEmailResponse?.error) return { error: sendEmailResponse.error }

  return { message: 'Email has been sent' }
}
