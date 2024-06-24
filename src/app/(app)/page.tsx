import Image from 'next/image'

import markPic from '@/../public/images/mark-pic.png'
import { Puff } from '@/components/home/buff'

const styleDecorations = [
  { name: 'African', describtion: 'abcd' },
  { name: 'Retro', describtion: 'abcd' },
  { name: 'Industrial', describtion: 'abcd' },
  { name: 'Grandmillennial', describtion: 'abcd' },
  { name: 'Farmhouse', describtion: 'abcd' },
  { name: 'Japandi', describtion: 'abcd' },
  { name: 'Wabi-Sabi', describtion: 'abcd' },
  { name: 'Scandinavian', describtion: 'abcd' },
  { name: 'Islamic', describtion: 'abcd' },
  { name: 'Shabby', describtion: 'abcd' },
  { name: 'Mediterranean', describtion: 'abcd' },
  { name: 'Neoclassical', describtion: 'abcd' },
  { name: 'Minimalist', describtion: 'abcd' },
  { name: 'Modern', describtion: 'abcd' },
  { name: 'rustic or rural', describtion: 'abcd' },
  { name: 'Bohemian', describtion: 'abcd' },
  { name: 'Boho Chic', describtion: 'abcd' },
  { name: 'Contemporary', describtion: 'abcd' },
  { name: 'Art Deco', describtion: 'abcd' },
  { name: 'Bauhaus', describtion: 'abcd' },
  { name: 'coastal', describtion: 'abcd' },
  { name: 'Classic', describtion: 'abcd' },
]

export default function Home() {
  return (
    <main className='container mt-16 min-h-[calc(100dvh-88px)]'>
      {/* hero */}
      {/* TODO: loading animation */}
      <div className='flex flex-col items-center justify-between gap-y-10 md:flex-row'>
        <div className='text-center'>
          <h1 className='mb-6 text-[2rem] font-bold leading-9 tracking-wider'>
            About M.ARC
          </h1>
          <p className='max-w-[750px] sm:text-xl sm:leading-8 sm:tracking-wide'>
            M ARC is a company specializing in interior , exterior decoration
            design and creating creative wow factors, executing , coordinating
            finishing works with skill and innovation with shopdrawings,
            blending beauty and practicality to create exceptional designs that
            meet clients
          </p>
        </div>

        <div className=''>
          <div className='relative'>
            <Puff visible height='350' width='350' color='#f0bc11' />

            <Image
              src={markPic}
              alt='Mark Picture'
              className='absolute left-1/2 top-1/2 -mt-3 ml-1.5 h-[300px] -translate-x-1/2 -translate-y-1/2 object-contain'
            />
          </div>

          <h3 className='mb-2 mt-3 text-center text-2xl font-semibold tracking-wide text-primary'>
            CEO: Arch/Mark Sabry
          </h3>
        </div>
      </div>

      {/* decoration styles */}
      <div className='pb-12 pt-28'>
        <h2 className='relative mb-10 pb-1 text-center text-[2rem] font-bold text-primary before:absolute before:left-1/2 before:top-full before:h-0.5 before:w-28 before:-translate-x-1/2 before:bg-primary'>
          Decoration Styles
        </h2>

        <ul className='grid grid-cols-1 gap-5 md:grid-cols-2'>
          {styleDecorations.map(({ name, describtion }, idx) => (
            <li
              key={name}
              className='group relative h-[320px] overflow-hidden rounded-md border-2 border-primary transition-transform duration-500 hover:scale-105'
            >
              <Image
                src={`/images/style-types/${idx}.jpg`}
                alt={`${name} Style`}
                fill
                className='object-cover'
                sizes='(min-width: 768px) 50vw, 100vw'
              />

              <div className='absolute inset-0 -translate-y-full bg-[#f8d7da95] p-2 text-center text-black transition-transform duration-500 group-hover:translate-y-0'>
                <h5 className='mb-2 text-2xl font-bold'>{name} Style</h5>
                <p className='md:text-lg'>{describtion}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
