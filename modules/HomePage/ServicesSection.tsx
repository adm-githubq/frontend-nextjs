'use client'

import { ArrowIcon } from '@/public/icons/ArrowIcon'
import Image from 'next/image'
import Link from 'next/link'

interface ServiceSectionProps {
  title: string

  description: string
  tiles: {
    id: string | number
    TileDescription: string
    TileImage: {
      data: {
        attributes: {
          url: string
        }
      }
    }
    ServiceAddress?: string
  }[]
}

export const ServicesSection: React.FC<ServiceSectionProps> = ({
  title,
  description,
  tiles
}) => {
  return (
    <section
      id='services'
      className='w-full grid grid-flow-col items-center justify-center py-12 px-4 md:px-24 md:g sscroll-mt-36'
    >
      <div className='bg-primary max-w-[1156px] w-full h-full flex flex-col justify-center items-center rounded-3xl gap-6 md:gap-8 p-6 md:p-[48px]'>
        <div className='flex flex-col justify-center items-center gap-2 md:gap-4'>
          <h3 className='text-white text-2xl md:text-4xl font-bold text-center'>
            {title}
          </h3>
          <p className='text-white font-normal text-center'>{description}</p>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-6'>
          {tiles.map(tile => (
            <Link
              href={`/services/${tile.ServiceAddress}`}
              key={tile.id}
              className='bg-white w-full  flex flex-col justify-between p-6 pt-4 items-center rounded-2xl gap-4 hover:scale-105 hover:drop-shadow-md duration-300 ease-in-out'
            >
              <Image
                src={tile.TileImage.data.attributes.url}
                alt={tile.TileDescription}
                width={160}
                height={160}
              />
              <h4 className='font-bold text-xl text-center'>
                {tile.TileDescription}
              </h4>
              <div className='bg-primary rounded-full p-2'>
                <ArrowIcon />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
