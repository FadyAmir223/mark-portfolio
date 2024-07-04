'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import poster from '@/../public/assets/images/ad-thumb.webp'

export default function VideoAd() {
  const { ref, inView } = useInView({ threshold: 0.7 })
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (inView) setSrc('/assets/videos/advertisement.mp4')
  }, [inView])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster.src}
      className='mx-auto mb-12 mt-16 max-h-[90dvh]'
      controls
      muted
      autoPlay
    >
      <track kind='captions' />
    </video>
  )
}
