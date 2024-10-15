import { MeetingCard } from '@/components/MeetingCard'
import { TestimonialsSection } from '@/modules/HomePage/TestimonialsSection'
import JeffImage from '@/public/Graphic_Jeff.png'
import AshleighImage from '@/public/Graphic_Ashleigh.png'
import Image from 'next/image'
import AboutPageBG from '@/public/AboutPageBG.svg'
import LinkedInBubble from '@/public/LinkedInBubble.svg'
import BlobQuote from '@/public/Blob quote.svg'
import { Metadata } from 'next'
import { defaultMetadata } from '@/core/metadata'

const getAboutPageData = async () => {
  const aboutPageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about-page`,
    { next: { revalidate: 3600 } }
  )
  if (!aboutPageData.ok) {
    throw new Error('Failed to fetch home page data')
  }
  return aboutPageData.json()
}

const getTestimonialsData = async () => {
  const testimonialsData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=Testimonials&fields=TestimonialsSectionTitle`,
    { next: { revalidate: 3600 } }
  )
  if (!testimonialsData.ok) {
    throw new Error('Failed to fetch testimonials data')
  }
  return testimonialsData.json()
}

export const generateMetadata = async (): Promise<Metadata> => {
  const pageTitle = await getAboutPageData()
  const title = pageTitle.data.attributes.PageTitle || defaultMetadata.title
  const description =
    pageTitle.data.attributes.MetaDescription || defaultMetadata.description

  return {
    title,
    description
  }
}

const getHomePageData = async () => {
  const homePageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=headerTagLines`,
  )
  if (!homePageData.ok) {
    throw new Error('Failed to fetch home page data')
  }
  return homePageData.json()
}

const AboutPage = async () => {
  const homePage = await getHomePageData()
  const aboutPage = await getAboutPageData()
  const testimonialsData = await getTestimonialsData()

  const testimonials = {
    testimonials: testimonialsData.data.attributes.Testimonials,
    title: testimonialsData.data.attributes.TestimonialsSectionTitle
  }

  const JeffData = {
    name: aboutPage.data.attributes.Person1Name,
    quote: aboutPage.data.attributes.Person1Quote,
    description: aboutPage.data.attributes.Person1Description
  }

  const AshleighData = {
    name: aboutPage.data.attributes.Person2Name,
    quote: aboutPage.data.attributes.Person2Quote,
    description: aboutPage.data.attributes.Person2Description
  }

console.log(homePage.data.attributes);
  return (
    <main className='flex flex-col items-center overflow-x-hidden '>
      <section>
        <div className='relative flex flex-col justify-center items-center  w-screen py-2 lg:py-12 px-8 md:px-24'>
          <Image
            src={AboutPageBG}
            alt={'About page heading background'}
            fill
            style={{ objectFit: 'cover', objectPosition: 'bottom', zIndex: -1 }}
            className='absolute left-0 right-0 -z-10 scale-110 lg:scale-100'
          />
          <div className='max-w-[2440px]'>
            <h1 className='text-white font-bold pt-0 pb-5 md:pt-12 mt-[60px] text-[32px] leading-[48px] max-w-[80%]'>
              {aboutPage.data.attributes.Heading}
            </h1>

            {homePage.data.attributes.headerTagLines ? (
              <div className='flex gap-x-12 gap-y-2 text-xl text-white font-bold md:pb-8 pb-6 flex-wrap'>
                {homePage.data.attributes.headerTagLines.map((item: { content: string }) => (
                  <h3 className='text-nowrap'>{item.content}</h3>
                ))}
              </div>
            ) : null}

          </div>
        </div>
      </section>
      <section className='flex flex-col gap-8 mt-10 sm:mt-0 py-2 lg:py-8 px-8 max-w-[2440px] items-center justify-center '>
        <div className='flex flex-wrap-reverse justify-center gap-14'>
          <div className='flex flex-col gap-4 md:w-2/5'>
            <h2 className='font-bold text-[48px] leading-[72px]'>
              {JeffData.name}
            </h2>
            <div className='flex items-center gap-6 border border-primary rounded-2xl py-4 pl-4 pr-6'>
              <Image
                src={BlobQuote}
                alt='Blob quote'
                style={{ height: '80px', width: '80px' }}
              />
              <p className='text-[16px] leading-6 font-bold'>
                {JeffData.quote}
              </p>
            </div>
            <p className='whitespace-pre-wrap'>{JeffData.description}</p>
            <a
              href='https://www.linkedin.com/in/jeff-soilson-a11b697/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src={LinkedInBubble}
                alt='LinkedIn bubble'
                className=' hover:scale-110 duration-200 ease-in-out transition-all'
              />
            </a>
          </div>
          <div className='flex justify-center items-center min-w-[300px] md:min-w-[448px]'>
            <Image
              src={JeffImage}
              alt='Picture of Jeff Soilson'
              width={500}
              height={500}
              className='brightness-90'
            />
          </div>
        </div>
        <div className='flex py-12 flex-wrap gap-14 justify-center'>
          <div className='flex justify-center items-center min-w-[300px] md:min-w-[448px]'>
            <Image
              src={AshleighImage}
              alt='Picture of the Ashleigh Louis PhD'
              width={600}
              height={300}
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
          </div>
          <div className='flex flex-col gap-4 md:w-2/5'>
            <h2 className='font-bold text-[48px] leading-[72px]'>
              {AshleighData.name}
            </h2>
            <div className='flex items-center gap-6 border border-primary rounded-2xl py-4 pl-4 pr-6'>
              <Image
                src={BlobQuote}
                alt='Blob quote'
                style={{ height: '80px', width: '80px' }}
              />
              <p className='text-[16px] leading-6 font-bold'>
                {AshleighData.quote}
              </p>
            </div>
            <p className='whitespace-pre-wrap'>{AshleighData.description}</p>
            <a
              href='https://www.linkedin.com/in/ashleighlouis/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src={LinkedInBubble}
                alt='LinkedIn bubble'
                className=' hover:scale-110 duration-200 ease-in-out transition-all'
              />
            </a>
          </div>
        </div>
      </section>
      <TestimonialsSection
        testimonials={testimonials.testimonials}
        title={testimonials.title}
      />
      <section className='w-full flex items-center justify-center -mt-10 md:mt-0 p-8 md:px-0 lg:py-24'>
        <MeetingCard buttonText='Meet Our Founders' calendly={true} />
      </section>
    </main>
  )
}

export default AboutPage
