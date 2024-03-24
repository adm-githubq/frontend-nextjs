'use client'

import Image from 'next/image'
import TestimonialsBackground from '@/public/Testimonials-blob-BG.svg'
import quoteIcon from '@/public/quoteIcon.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import parse from 'html-react-parser'

import 'swiper/css'
import 'swiper/css/autoplay'
import { SwiperNavButtons } from '@/components/SwiperNavButtons'

interface TestimonialsSectionProps {
  title: string
  testimonials: {
    id: string | number
    TestimonialName: string
    TestimonialContents: string
  }[]
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  testimonials
}) => {
  return (
    <section
      id='testimonials'
      className='w-full h-full flex flex-col items-center justify-center py-4 lg:py-24 relative mt-16 md:my-8'
    >
      <Image
        src={TestimonialsBackground}
        alt='background'
        fill
        className='object-cover md:object-fill -translate-y-10 md:translate-y-0 -z-10'
      />
      <h3 className='max-w-[600px] mb-[40px] text-center text-white font-bold text-2xl md:text-4xl leading-[72px]'>
        {title}
      </h3>
      <Swiper
        modules={[Navigation]}
        loop={true}
        breakpoints={{
          300: {
            slidesPerView: 1.2,
            centeredSlides: false,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 1.3,
            centeredSlides: false,
            spaceBetween: 5
          },
          768: {
            slidesPerView: 1.5,
            centeredSlides: true,
            spaceBetween: 80
          },
          1024: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 80
          },
          2840: {
            slidesPerView: 5,
            centeredSlides: true,
            spaceBetween: 80
          }
        }}
        className='w-full relative flex justify-center items-center '
      >
        {testimonials.map(testimony => (
          <SwiperSlide
            key={testimony.id}
            className='cursor-grab py-4 pl-4 md:pl-0'
          >
            <div className='bg-white max-w-[1140px] md:mx-0 md:w-full h-fit md:h-[360px] min-h-[360px] flex flex-col rounded-3xl gap-8 p-8 md:p-[48px] relative shadow-md shadow-gray-300 md:shadow-sm md:shadow-gray-300/40'>
              <Image
                src={quoteIcon}
                alt='quote icon'
                width={50}
                height={32}
                className='absolute top-8 left-12'
              />
              <div className='mt-12 overflow-y-scroll styled-scrollbar h-[416px]'>
                {parse(testimony.TestimonialContents)}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>
    </section>
  )
}
