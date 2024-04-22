'use client'

import { ShareButton } from '@/components/ShareButton'
import { Resource } from '@/core/resources'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from './ResourceContent.module.css';

interface ResourceContentProps {
  resource: Resource
}
export const ResourceContent = ({ resource }: ResourceContentProps) => {
  return (
    <div className='w-full md:w-3/5 p-4 md:p-8 bg-white flex flex-col gap-4 rounded-3xl shadow-xl shadow-gray-300/60 mb-16'>
      <div className='flex justify-between items-center w-full relative'>
        <div className='flex gap-2'>
          <span className='text-sm text-gray-500'>{resource.publishedAt}</span>
        </div>
        <ShareButton postAddress={resource.PostAddress} />
      </div>
      <div className='text-sm text-gray-500'>
        Published by: {resource.PublishedBy}
      </div>
      <h2 className='text-2xl md:text-4xl leading-normal font-bold text-black'>
        {resource.title}
      </h2>
      <div className='text-sm text-gray-500'>
        <span>Categories: </span>
        <span className='italic'>
          {resource.categories
            ?.map((category: any) => category.name)
            .join(', ')}
        </span>
      </div>
      <div className='w-full aspect-[2/1] relative'>
        <Image
          src={resource.img as string}
          alt='resource image'
          fill
          objectFit='contain'
          className='rounded-xl border border-gray-200'
        />
      </div>
      <div className={`mt-4 ${styles.content}`} dangerouslySetInnerHTML={{ __html: resource.content }}></div>
    </div>
  )
}
