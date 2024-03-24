'use client'
import { useSwiper, useSwiperSlide } from 'swiper/react'
import { ArrowIcon } from '@/public/icons/ArrowIcon'
import { useEffect, useState } from 'react'

export const SwiperNavButtons = () => {
  const [distanceFromCenter, setDistanceFromCenter] = useState(0)
  const swiper = useSwiper()

  useEffect(() => {
    const activeSlide = document
      .querySelector('.swiper-slide-active')
      ?.getBoundingClientRect()
    const slideWidth = activeSlide?.width
    const distanceFromCenter = (slideWidth as number) / 2 + 60

    setDistanceFromCenter(Math.floor(distanceFromCenter))
  }, [swiper])

  return (
    <div className='w-full -z-10 hidden md:block'>
      <button
        style={{
          ['--distanceFromCenter' as any]: `${distanceFromCenter}px`
        }}
        className={`absolute top-1/2 left-1/2 transform -translate-x-[--distanceFromCenter] -translate-y-1/2 p-3 z-10 border border-white rounded-full`}
        onClick={() => swiper.slidePrev()}
      >
        <ArrowIcon className='stroke-white rotate-180' />
      </button>
      <button
        style={{
          ['--distanceFromCenter' as any]: `${distanceFromCenter}px`
        }}
        className={`absolute top-1/2 right-1/2 transform translate-x-[--distanceFromCenter]  -translate-y-1/2 p-3 z-10 border border-white rounded-full `}
        onClick={() => swiper.slideNext()}
      >
        <ArrowIcon className='stroke-white ' />
      </button>
    </div>
  )
}
