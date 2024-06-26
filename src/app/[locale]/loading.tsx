'use client'

import { Puff } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className='flex grow items-center justify-center'>
      <Puff visible height='75' width='75' color='#f0bc11' />
    </div>
  )
}
