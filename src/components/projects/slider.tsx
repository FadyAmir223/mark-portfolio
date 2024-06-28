'use client'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

import type { getProjects } from '@/data/project'
import type { ProjectTypeSchema } from '@/schema/project-types'
import { cn } from '@/utils/cn'
import { ASSETS, SEARCH_PARAMS } from '@/utils/constants'

import type { TLocale } from '../../types/custom'
import ImageApi from '../image'

type SliderProps = {
  type: ProjectTypeSchema
  projects: Awaited<ReturnType<typeof getProjects>>
}

function SlideNavButtons() {
  const swiper = useSwiper()
  const locale = usePathname().slice(1, 3) as TLocale

  const handleNeighbourSlide = (direction: 1 | -1) => {
    const slides = swiper.slides.length
    const index = (swiper.realIndex + direction + slides) % slides
    swiper.slideTo(index)
  }

  const IconNext = locale === 'en' ? FaAngleRight : FaAngleLeft
  const IconPrev = locale === 'en' ? FaAngleLeft : FaAngleRight

  return (
    <div className='absolute top-1/2 z-10 flex w-full -translate-y-1/2 justify-between px-3'>
      <button
        className='grid size-9 place-items-center rounded-full bg-background text-primary'
        onClick={() => handleNeighbourSlide(-1)}
        aria-label='navigate previous'
        type='button'
      >
        <span className='scale-125'>
          <IconPrev />
        </span>
      </button>

      <button
        className='grid size-9 place-items-center rounded-full bg-background text-primary'
        onClick={() => handleNeighbourSlide(1)}
        aria-label='navigate next'
        type='button'
      >
        <span className='scale-125'>
          <IconNext />
        </span>
      </button>
    </div>
  )
}

export default function Slider({ type, projects }: SliderProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) video.pause()
    })
  }

  return (
    <section className='mb-10'>
      <ul className='space-y-6'>
        {projects.map(({ id, name, images, video, localized }, index) => (
          <motion.li
            key={id}
            className='rounded-lg border-y-2 border-primary py-1.5'
            initial={{ opacity: 0, x: 200 * (index % 2 ? 1 : -1) }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className={cn(
                'flex flex-col gap-6 rounded-lg border-x-2 border-primary p-4 ',
                index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row',
              )}
            >
              <div className='text-center lg:w-1/3'>
                <h3 className='mb-3 text-lg font-bold tracking-wide text-primary sm:text-xl md:text-2xl lg:text-3xl'>
                  {localized[0].title}
                </h3>
                <p className='sm:text-lg md:text-xl'>
                  {localized[0].description}
                </p>
              </div>

              <div className='w-full lg:w-2/3'>
                <Swiper className='relative'>
                  <SwiperSlide>
                    <video
                      src={`${ASSETS.videos}?p=projects/${type}/${name}/${video}`}
                      className='relative z-10 max-h-[calc(100vh-150px)] w-full focus:outline-0'
                      controls
                      poster={`${ASSETS.images}?${SEARCH_PARAMS.path}=projects/${type}/${name}/images/${images[0]}`}
                      ref={(el) => {
                        videoRefs.current[index] = el
                      }}
                      onPlay={() => handlePlay(index)}
                    >
                      <track kind='captions' />
                    </video>
                  </SwiperSlide>

                  {images?.map((image) => (
                    <SwiperSlide key={image} className='min-h-full grow'>
                      <ImageApi
                        src={`projects/${type}/${name}/images/${image}`}
                        alt={`${name} snapshot details`}
                        width={16}
                        height={9}
                        sizes='(min-width: 976px) 66vw, 100vw'
                        className='w-full object-contain'
                      />
                    </SwiperSlide>
                  ))}

                  <SlideNavButtons />
                </Swiper>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
