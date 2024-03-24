import { defaultMetadata } from '@/core/metadata'
import { getSingleResource } from '@/core/resources'
import { ResourceContent } from '@/modules/ResourcePage/ResourceContent'
import { NewsletterCard } from '@/modules/ResourcesPage/NewsletterCard'
import { ResourcesCategories } from '@/modules/ResourcesPage/ResourcesCategories'
import HeaderBackground from '@/public/HeaderBackground_v2.svg'
import { Metadata } from 'next'
import Image from 'next/image'

export interface ResourceCategory {
  id: string
  name: string
}
const getResourcePageData = async (PostAddress: string) => {
  const resourcesPageData = await fetch(
    `https://cms.quantumadr.com/api/blog-posts?filters[PostAddress][$eq]=${PostAddress}&populate=*`,
    { next: { revalidate: 0 } }
  )
  if (!resourcesPageData.ok) {
    throw new Error('Failed to fetch resources page data')
  }
  return resourcesPageData.json()
}

const getResourcesCategoriesData = async () => {
  const resourcesCategoriesData = await fetch(
    `https://cms.quantumadr.com/api/categories?populate=*`,
    { next: { revalidate: 0 } }
  )
  if (!resourcesCategoriesData.ok) {
    throw new Error('Failed to fetch resources categories data')
  }
  return resourcesCategoriesData.json()
}

export const generateMetadata = async ({
  params
}: {
  params: { PostAddress: string }
}): Promise<Metadata> => {
  const postData = await getResourcePageData(params.PostAddress)
  const title = defaultMetadata.title
  const description =
    postData?.data[0]?.attributes?.PostTitle || defaultMetadata.description

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: postData?.data[0]?.attributes?.FeaturedImage?.data?.attributes
            ?.formats?.large?.url,
          width: 1200,
          height: 600,
          alt: postData?.data[0]?.attributes?.PostTitle,
          type: 'image/png'
        }
      ]
    }
  }
}

const ResourcesPage = async ({
  params
}: {
  params: { PostAddress: string }
}) => {
  const resourceData = await getResourcePageData(params.PostAddress)
  const resourcesCategories = await getResourcesCategoriesData()
  return (
    <div className='flex relative flex-col items-center justify-center gap-8 w-full px-4 md:px-24 sm:pt-[200px] py-12 md:py-40 overflow-x-hidden '>
      <div className='absolute -z-10 -top-[30vh] h-screen w-full scale-150'>
        <Image
          src={HeaderBackground}
          alt='header background'
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
        />
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-8'>
        <div className='w-[95%] md:w-4/5 flex gap-8 items-center mb-4 md:mb-12 relative z-10'>
          <ResourcesCategories categories={resourcesCategories.data} />
        </div>
        <section className='w-full flex items-center justify-center'>
          <ResourceContent
            resource={getSingleResource(resourceData.data[0], {
              fullContent: true
            })}
          />
        </section>
        <section className='w-full md:w-4/5 flex items-center justify-center'>
          <NewsletterCard />
        </section>
      </div>
    </div>
  )
}

export default ResourcesPage
