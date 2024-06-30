import { cn } from '@/utils/cn'

export default function ProjectsSkeleton() {
  return Array.from({ length: 3 }).map((_, index) => (
    <div
      // eslint-disable-next-line react/no-array-index-key
      key={index}
      className='animate-pulse rounded-lg border-y-2 border-primary py-1.5'
    >
      <div
        className={cn(
          'flex flex-col gap-6 rounded-lg border-x-2 border-primary p-4 ',
          index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className='text-center lg:w-1/3'>
          <div className='mb-3 h-7 w-72 rounded-md bg-neutral-600 sm:h-8 lg:h-9' />
          {Array.from({ length: 5 }).map((__, pIndex) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={pIndex}
              className='mb-3 h-4 w-full rounded-sm bg-neutral-600 sm:h-5'
            />
          ))}
          <div className='h-4 w-2/5 rounded-sm bg-neutral-600 sm:h-5' />
        </div>

        <div className='aspect-[16/9] w-full bg-neutral-600 lg:w-2/3' />
      </div>
    </div>
  ))
}
