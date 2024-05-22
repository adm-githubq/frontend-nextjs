import Image from 'next/image'
import BulletPointIcon from '@/public/Bullet-point-icon.svg'
import Link from 'next/link'
import { MeetingCard } from '@/components/MeetingCard'
import ServicePageBG from '@/public/Service-background.svg'
import { Metadata } from 'next'
import { defaultMetadata } from '@/core/metadata'
import { OtherService, Service, getOtherServices } from '@/core/services'

const FetchServiceData = async (slug: string) => {
  const ServiceData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services?filters[slug][$eq]=${slug}&populate=*`,
  )
  if (!ServiceData.ok) {
    throw new Error('Failed to fetch coparenting service page data')
  }
  return ServiceData.json()
}

const FetchOtherServicesData = async () => {
  const OtherServicesData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=Tiles.TileImage,Tiles.Service`,
  )
  if (!OtherServicesData.ok) {
    throw new Error('Failed to fetch other services data')
  }
  return OtherServicesData.json()
}

export const generateMetadata = async ({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> => {
  const pageTitle = await FetchServiceData(params.slug)
  const title = pageTitle.data[0].attributes.PageTitle || defaultMetadata.title
  const description =
    pageTitle.data[0].attributes?.MetaDescription || defaultMetadata.description

  return {
    title,
    description
  }
}

const ServicePage = async ({ params }: { params: { slug: string } }) => {
  const ServicePageData = await FetchServiceData(params.slug)

  const PageData: Service = {
    id: ServicePageData.data[0].id,
    heading: ServicePageData.data[0].attributes.Heading,
    subheading: ServicePageData.data[0].attributes.HeadingBodyCopy,
    bulletPointsSectionTitle:
      ServicePageData.data[0].attributes.BulletPointsSectionTitle,
    bulletPoints: ServicePageData.data[0].attributes.BulletPoints,
    headingImage: ServicePageData.data[0].attributes.HeadingImage.data.attributes
      .formats
      ? ServicePageData.data[0].attributes.HeadingImage.data.attributes.formats
          .large.url
      : ServicePageData.data[0].attributes.HeadingImage.data.attributes.url,
    otherServicesSectionTitle:
      ServicePageData.data[0].attributes.OtherServicesSectionTitle
  }

  const normalizeString = (string: string) => {
    return string.replace(/\s/g, '').replace(/\+/g, 'and').toLowerCase()
  }

  const OtherServicesData = await FetchOtherServicesData()

  const OtherServicesWithLink: OtherService[] = getOtherServices(
    OtherServicesData.data.attributes.Tiles
  )

  const filteredOtherServices: OtherService[] = OtherServicesWithLink.filter(
    (service: OtherService) =>
      normalizeString(service.TileDescription as string) !==
      normalizeString(PageData.heading as string)
  )

  return (
    <main className='relative overflow-x-hidden   w-full flex flex-col'>
      <section className='flex relative flex-col items-center justify-center gap-8 w-full px-4 md:px-24 sm:pt-[200px] py-12 md:py-40'>
        <Image
          src={ServicePageBG}
          alt={'About page heading background'}
          fill
          objectFit='cover'
          objectPosition='bottom'
          className=' left-0 right-0 -z-10 scale-150 -translate-y-[5vh]'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-[1440px]'>
          <div className='flex flex-col justify-center md:justify-start gap-12 items-start min-w-[300px]'>
            <h1 className='text-[32px] leading-[48px] font-bold text-white'>
              {PageData.heading}
            </h1>
            <p className='text-lg text-white whitespace-pre-wrap'>
              {PageData.subheading}
            </p>
          </div>
          <div className='flex flex-col justify-center items-center min-w-[300px] pb-4 md:pb-36'>
            <Image
              src={PageData.headingImage as string}
              alt='header image'
              height={460}
              width={460}
            />
          </div>
        </div>
      </section>
      <section className='flex flex-col justify-center items-center px-4 py-12 md:-mt-48'>
        <div className='flex items-center justify-center gap-6 max-w-[1152px] w-full bg-white rounded shadow-expandable-shadow p-12 mt-12 md:mt-0'>
          <div className='flex flex-col gap-12 justify-center items-center w-full bg-white rounded'>
            <h2 className='text-gray-900 text-center font-bold text-2xl md:text-4xl leading-[72px]'>
              {PageData.bulletPointsSectionTitle}
            </h2>
            <ul className='text-gray-900 text-[16px] leading-[24px] w-full grid md:grid-cols-2 lg:grid-cols-3 items-center gap-8'>
              {PageData.bulletPoints?.map(bulletPoint => (
                <li
                  className='flex p-[6px] gap-4 items-center capitalize'
                  key={bulletPoint.id}
                >
                  <Image
                    src={BulletPointIcon}
                    alt='check mark'
                    height={48}
                    width={48}
                  />
                  {bulletPoint.content}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className='flex flex-col justify-center items-center  px-4 py-12 gap-8'>
        <h2 className='text-2xl md:text-4xl leading-[60px] font-bold'>
          {PageData.otherServicesSectionTitle}
        </h2>
        <div className='flex flex-wrap justify-center gap-6'>
          {filteredOtherServices.map(service => (
            <Link
              key={service.Service?.data.attributes.slug}
              href={`/services/${service.Service?.data.attributes.slug}`}
              className='flex gap-4 p-8 items-center rounded-2xl shadow-expandable-shadow w-full md:w-[368px] bg-white hover:scale-105 duration-200 ease-in-out'
            >
              <Image
                src={service.TileImage?.data.attributes.url as string}
                alt={`${service.TileDescription} icon`}
                width={80}
                height={80}
              />
              <h3 className='text-[20px] font-bold leading-[30px]'>
                {service.TileDescription}
              </h3>
            </Link>
          ))}
        </div>
      </section>
      <section className='flex justify-center p-4 md:p-8 mb-12 md:mb-0s'>
        <MeetingCard calendly={true} buttonText='Meet Our Founders' />
      </section>
    </main>
  )
}

export default ServicePage

type StaticService = {
  id: number
  attributes: {
    slug: string
  }
}

export async function generateStaticParams() {
  const servicesReq = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/services?fields[0]=slug`
  )

  if (!servicesReq.ok) {
    throw new Error('Failed to fetch resources page data')
  }

  const services = await servicesReq.json()

  return services.data.map((service: StaticService) => ({
    slug: service.attributes.slug,
  }))
}
