'use client'

import Image from 'next/image'
import Button from '@/components/atoms/Button'
import Link from 'next/link'
import placeholder from '@/public/Placeholder.png'
import { useEffect, useRef, useState } from 'react'
import { ShareButton } from '@/components/ShareButton'

interface ResourcesSectionProps {
  featured: any
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL
export const FeaturedSection = ({ featured }: ResourcesSectionProps) => {
  // TODO - check useLayoutEffect for dynamic lineclamp in featured content
  const contentRef = useRef<HTMLDivElement>(null)

  // TODO - determine which featured resource to show
  const featuredTitle = featured[0].attributes.PostTitle ?? ''
  const featuredContent = featured[0].attributes.PostContentEditor ?? ''
  const featuredId = featured[0].id ?? ''
  const featuredPostAddress = featured[0].attributes.PostAddress ?? ''
  const featuredImage =
    featured[0].attributes.Thumbnail && featured[0].attributes.Thumbnail.data
      ? featured[0].attributes.Thumbnail.data.attributes.url
      : placeholder

  const largeFeaturedThumbnail = featuredImage.replace('thumbnail', 'large')

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = featuredContent
    }
  }, [featured])

  return (
    <section className='w-full flex flex-col items-center gap-8'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-4xl font-bold text-white'>Featured</h2>
      </div>
      <div className='w-full md:h-[480px] md:flex flex-wrap rounded-3xl shadow-lg shadow-gray-300/60 md:shadow-gray-300/40 bg-white border md:border-none'>
        <div className='w-full md:w-1/2 md:h-[480px] min-w-[300px] border-b md:border-r md:border-b-0'>
          <div className='relative w-full md:h-full aspect-[3/2] md:aspect-auto '>
            <Image
              src={largeFeaturedThumbnail}
              alt='featured image'
              fill
              style={{ objectFit: 'cover', objectPosition: 'left' }}
              className='rounded-tl-3xl rounded-tr-3xl md:rounded-tr-none md:rounded-bl-3xl '
            />
          </div>
        </div>
        <div className='w-full md:w-1/2 md:min-w-[300px] h-full bg-white px-6 py-8 md:p-8 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl md:rounded-bl-none flex-grow flex flex-col gap-4'>
          <h3 className='md:text-3xl text-2xl leading-[36px] md:leading-[48px] font-bold text-black'>
            {featuredTitle}
          </h3>
          <div
            className={`h-[200px] md:h-full overflow-hidden line-clamp-[9] md:line-clamp-[8]`}
            ref={contentRef}
          />
          <div className='w-full flex justify-between items-center mt-auto relative'>
            <Link href={`/resources/${featuredPostAddress}`}>
              <Button color='black' size='large'>
                Read More
              </Button>
            </Link>
            <ShareButton postAddress={featuredPostAddress} />
          </div>
        </div>
      </div>
    </section>
  )
}
