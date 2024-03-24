'use client'

import Image from 'next/image'
import Link from 'next/link'
import placeholder from '@/public/Placeholder.png'
interface CardProps {
  imgUrl: string
  title: string
  linkUrl?: string
  resourceType?: string
  readMore?: boolean
  resourceLabelColor?: string
}
export const Card = ({
  imgUrl,
  title,
  linkUrl,
  resourceType,
  readMore,
  resourceLabelColor
}: CardProps) => {
  return (
    <Link
      href={linkUrl ? linkUrl : ''}
      className={
        linkUrl
          ? 'cursor-pointer hover:scale-[1.02] transition-all duration-300'
          : 'pointer-events-none'
      }
      tabIndex={linkUrl ? 0 : undefined}
    >
      <div className='flex flex-col w-full  md:w-[340px] aspect-[1/1] bg-white shadow-xl shadow-gray-300/40 relative rounded-2xl border border-gray-200 overflow-hidden'>
        {resourceType ? (
          <div
            style={{ ['--bg-color' as any]: resourceLabelColor }}
            className={`absolute top-2 right-2 flex justify-center items-center px-3 py-1 width-8 bg-[--bg-color] rounded-full z-10`}
          >
            <span className='text-white text-xs font-bold'>{resourceType}</span>
          </div>
        ) : null}{' '}
        <div className='w-full h-2/3'>
          <div className='relative w-full h-full'>
            <Image
              src={imgUrl || placeholder}
              alt={title}
              fill
              objectFit='cover'
              objectPosition='left'
            />
          </div>
        </div>
        <div className='w-full h-1/3 flex flex-col justify-center px-6 md:px-8 border-t border-gray-200'>
          <div className='text-lg md:text-xl font-bold text-black line-clamp-2'>
            {title}
          </div>
        </div>
        {readMore ? (
          <div className='w-full  flex justify-center items-center text-sm font-bold px-6 pb-8'>
            Read more
          </div>
        ) : null}
      </div>
    </Link>
  )
}
