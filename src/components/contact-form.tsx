'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'

import { sendMessage } from '@/actions/messages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import type { ContactSchema } from '@/schema/contact'
import { contactSchema } from '@/schema/contact'

export default function ContactForm() {
  const {
    register,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  })
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const t = useTranslations('Contact')

  const handleSendMessage = async () => {
    const result = await trigger()
    if (!result) return

    const formData = getValues()

    startTransition(() => {
      sendMessage(formData)
        .then((response) => {
          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, message]) => {
              setError(field as keyof ContactSchema, {
                type: 'validate',
                message: message as string,
              })
            })
            return
          }

          toast({
            title: 'Success',
            description: response.message,
          })
        })
        .catch(() => {
          toast({
            title: 'Failed',
            description: 'Message has not been sent',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <form action={handleSendMessage} className='space-y-3'>
      <div>
        <Label htmlFor='phone' className='text-primary'>
          {t('phone')}
        </Label>
        <Input
          id='phone'
          placeholder='013xxxxxxxx'
          {...register('phone')}
          className='bg-neutral-800'
        />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.phone?.message}
        </p>
      </div>

      <div>
        <Label htmlFor='message' className='text-primary'>
          {t('message.label')}
        </Label>
        <Textarea
          id='message'
          placeholder={t('message.placeholder')}
          {...register('message')}
          className='bg-neutral-800'
        />
        <p className='h-[1.21875rem] text-[0.8rem] font-medium text-destructive'>
          {errors.message?.message}
        </p>
      </div>

      <Button className='text-black hover:bg-[#f0bb0f95]' disabled={isPending}>
        {t('submit')}
      </Button>
    </form>
  )
}
