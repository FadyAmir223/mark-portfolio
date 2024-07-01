'use client'

import type { Contact } from '@prisma/client'
import { useTransition } from 'react'
import { FaTrashCan } from 'react-icons/fa6'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type TrashButtonProps = {
  id: Contact['id']
  submitServer: (id: string) => Promise<{ error: string } | undefined>
}

export default function TrashButton({ id, submitServer }: TrashButtonProps) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleDeleteMessage = () => {
    startTransition(() => {
      submitServer(id)
        .then((response) => {
          if (response?.error)
            toast({
              description: response.error,
              variant: 'destructive',
            })
        })
        .catch(() => {
          toast({
            description: 'Item Has not been deleted',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <Button
      variant='none'
      size='none'
      disabled={isPending}
      onClick={handleDeleteMessage}
    >
      <FaTrashCan className='size-6 text-destructive hover:text-destructive/80' />
    </Button>
  )
}
