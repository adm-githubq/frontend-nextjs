import React from 'react'
import Image from 'next/image'
import HeadingSectionBG from '@/public/Heading-section-bg.svg'
import HeadingImageBG from '@/public/Heading-image-bg.svg'
import Link from 'next/link'
import Button from '@/components/atoms/Button'
import TagLines from '@/components/TagLines'

interface HeadingProps {
  headingData: {
    mainHeading: string;
    HeaderTitle: string
    headingDescription: string
    headingButtonSecondary: string
    headingButtonPrimary: string
    headingTagLines: { id: number; content: string }[] | null
    headingImage: string
  }
}

export const HomePageHeader = ({ headingData }: HeadingProps) => {
  return (
    <section className='flex relative flex-col items-center justify-center gap-8 w-full px-4 md:px-24 sm:pt-[200px] py-12 md:py-40'>
      <Image
        src={HeadingSectionBG}
        alt='header background'
        fill
        objectFit='cover'
        objectPosition='bottom'
        loading='eager'
        decoding='sync'
        className=' left-0 right-0 -z-10 scale-110 -translate-y-[5vh]'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1440px]'>
        <div className='flex flex-col justify-center md:justify-start gap-12 items-start min-w-[300px]'>
          <div className='flex flex-col gap-6 w-[95%] items-center md:items-start'>
            <h1 className='text-[32px] leading-[48px] font-bold text-white'>
            {headingData.mainHeading}
            </h1>
            <h2 className='text-white font-bold text-2xl'>
              {headingData.HeaderTitle}
            </h2>

            <TagLines data={headingData.headingTagLines} />

            <p className='text-lg text-white whitespace-pre-wrap'>
              {headingData.headingDescription}
            </p>
          </div>
          <div className='flex flex-row gap-4 items-start'>
            <Link href='/about'>
              <Button size='large' color='black'>
                Meet Our Founders
              </Button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center min-w-[300px]'>
          <Image
            src={HeadingImageBG}
            alt='header image background'
            height={650}
            width={650}
            objectPosition='right'
            className='absolute -z-10 md:w-1/2 min-[1200px]:w-[650px]'
            loading='eager'
            decoding='sync'
          />
          <Image
            src={headingData.headingImage}
            alt='header image'
            height={650}
            width={650}
            objectPosition='center'
            loading='eager'
            decoding='sync'
          />
        </div>
      </div>
    </section>
  )
}
