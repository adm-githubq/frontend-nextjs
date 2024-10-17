import { MeetingCard } from '@/components/MeetingCard'
import { TestimonialsSection } from '@/modules/HomePage/TestimonialsSection'
import Image from 'next/image'
import AboutPageBG from '@/public/AboutPageBG.svg'
import LinkedInBubble from '@/public/LinkedInBubble.svg'
import BlobQuote from '@/public/Blob quote.svg'
import { Metadata } from 'next'
import { defaultMetadata } from '@/core/metadata'
import TagLines from '@/components/TagLines'
import { cn } from '@/core/utils'

type TeamMember = {
  id: number
  name: string
  quote: string
  linkedIn: string
  description: string
  layout: 'Portrait left, text right' | 'Text left, Portrait right'
  portrait: null | {
    data: {
      attributes: {
        url: string
      }
    }
  }
}

const getAboutPageData = async () => {
  const aboutPageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about-page?populate[teamMembers][populate]=portrait&populate=headingTagLines`,
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

const AboutPage = async () => {
  const aboutPage = await getAboutPageData()
  const testimonialsData = await getTestimonialsData()

  const testimonials = {
    testimonials: testimonialsData.data.attributes.Testimonials,
    title: testimonialsData.data.attributes.TestimonialsSectionTitle
  }

console.log(aboutPage.data.attributes);
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
            <TagLines
              data={aboutPage.data.attributes.headingTagLines}
              className='md:pb-8 pb-6'
            />
          </div>
        </div>
      </section>

      <section className='flex flex-col gap-20 mt-10 sm:mt-0 py-2 lg:pt-8 lg:pb-20 px-8 max-w-[2440px] items-center justify-center '>
        {aboutPage.data.attributes.teamMembers.map((member: TeamMember) => (
          <div
            className={cn(
              'flex justify-center flex-wrap',
              member.layout === 'Text left, Portrait right'
                ? 'flex-col-reverse lg:flex-row gap-14'
                : 'flex-col-reverse lg:flex-row-reverse gap-12'
            )}
            key={member.id}
          >
            <div className='flex flex-col gap-4 lg:w-2/5'>
              <h2 className='font-bold text-[48px] leading-[72px]'>
                {member.name}
              </h2>
              <div className='flex items-center gap-6 border border-primary rounded-2xl py-4 pl-4 pr-6'>
                <Image
                  src={BlobQuote}
                  alt='Blob quote'
                  style={{ height: '80px', width: '80px' }}
                />
                <p className='text-[16px] leading-6 font-bold'>
                  {member.quote}
                </p>
              </div>
              <p className='whitespace-pre-wrap'>{member.description}</p>
              <a
                href={member.linkedIn}
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
            <div className='flex justify-center items-center min-w-[300px] lg:min-w-[448px]'>
              {member.portrait?.data.attributes.url ? (
                <Image
                  src={member.portrait?.data.attributes.url}
                  alt={`Picture of ${member.name}`}
                  width={448}
                  height={590}
                  className='w-full max-w-screen-sm object-contain max-h-[500px] lg:max-h-[initial] h-full'
                />
              ) : null}
            </div>
          </div>
        ))}
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
