'use client'

import { type FormEvent, useRef, useTransition } from 'react'

import { uploadProject } from '@/actions/upload-project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { locales } from '@/utils/constants'

// TODO:
// client: z.instanceof(FileList)
// server: z.array(z.instanceof(File))

export default function UploadForm() {
  const elForm = useRef<HTMLFormElement>(null)

  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleUploadProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!elForm.current) return

    const formData = new FormData(elForm.current)

    startTransition(() => {
      uploadProject(formData)
        .then((response) => {
          if (response.error) {
            toast({
              description: response.error,
              variant: 'destructive',
            })
            return
          }

          toast({
            description: response.message,
          })
        })
        .catch(() => {
          toast({
            description: 'Error has occurred',
            variant: 'destructive',
          })
        })
    })
  }

  return (
    <form ref={elForm} onSubmit={handleUploadProject} className='space-y-3'>
      <div className='grid grid-cols-2 gap-x-5'>
        {locales.map((locale) => (
          <div key={locale}>
            <div className='mb-2'>
              <Label htmlFor={`${locale}.title`} className='text-primary'>
                Title in {locale === 'en' ? 'English' : 'Arabic'}
              </Label>
              <Input
                id={`${locale}.title`}
                name={`locale.${locale}.title`}
                className='bg-neutral-800'
                required
              />
            </div>

            <div>
              <Label htmlFor={`${locale}.description`} className='text-primary'>
                Description in {locale === 'en' ? 'English' : 'Arabic'}
              </Label>
              <Textarea
                id={`${locale}.description`}
                name={`locale.${locale}.description`}
                className='h-20 bg-neutral-800'
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Label htmlFor='images' className='text-primary'>
          Images
        </Label>
        <Input
          type='file'
          id='images'
          required
          className='w-fit bg-neutral-800'
          minLength={1}
          accept='image/*'
          multiple
          name='images'
        />
      </div>

      <div>
        <Label htmlFor='video' className='text-primary'>
          Video
        </Label>
        <Input
          type='file'
          id='video'
          name='video'
          required
          accept='video/*'
          // minLength={1}
          // max={1}
          className='w-fit bg-neutral-800'
        />
      </div>

      <Select name='type'>
        <SelectTrigger className='w-[180px] bg-neutral-800'>
          <SelectValue placeholder='Select Project Type' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='COMMERCIAL'>Commercial</SelectItem>
            <SelectItem value='RESIDENTIAL'>Residential</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button className='text-black hover:bg-[#f0bb0f99]' disabled={isPending}>
        Upload Project
      </Button>
    </form>
  )
}
