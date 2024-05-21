import { FeaturedSection } from '@/modules/ResourcesPage/FeaturedSection'
import { NewsletterCard } from '@/modules/ResourcesPage/NewsletterCard'
import { ResourcesCategories } from '@/modules/ResourcesPage/ResourcesCategories'
import { ResourcesSection } from '@/modules/ResourcesPage/ResourcesSection'
import HeaderBackground from '@/public/HeaderBackground_v2.svg'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { defaultMetadata } from '@/core/metadata'

export interface ResourceCategory {
  id: string
  name: string
}

const getResourcePageData = async () => {
  const resourcePageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/resource-page`
  )
  if (!resourcePageData.ok) {
    throw new Error('Failed to fetch resources page data')
  }
  return resourcePageData.json()
}

//const getBlogPosts = async () => {
//  const blogPostData = await fetch(
//    `${process.env.NEXT_PUBLIC_API_URL}/blog-posts?populate=*&sort=createdAt:desc`,
//    { next: { revalidate: 0 } }
//  )
//  if (!blogPostData.ok) {
//    throw new Error('Failed to fetch resources page data')
//  }
//  return blogPostData.json()
//}
//
const getSortedBlogPosts = async () => {
  const blogPostData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/resource-labels/4?populate[blog_posts][populate]=%2A`,
  )
  if (!blogPostData.ok) {
    throw new Error('Failed to fetch resources page data')
  }
  return blogPostData.json().then(res => res.data.attributes.blog_posts);
}

const getResourcesCategoriesData = async () => {
  const resourcesCategoriesData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    { next: { revalidate: 43200 } }
  )
  if (!resourcesCategoriesData.ok) {
    throw new Error('Failed to fetch resources categories data')
  }
  return resourcesCategoriesData.json()
}

export const generateMetadata = async (): Promise<Metadata> => {
  const pageTitle = await getResourcePageData()
  const title = pageTitle?.data?.attributes?.PageTitle || defaultMetadata.title
  const description =
    pageTitle.data.attributes?.MetaDescription || defaultMetadata.description

  return {
    title,
    description
  }
}

const ResourcesPage = async () => {
  const resourcesPage = await getSortedBlogPosts()
  const resourcesCategories = await getResourcesCategoriesData()

  const featuredResourcesData =
    resourcesPage && resourcesPage.data 
      ? resourcesPage.data.filter(
          (item: any) => item.attributes?.isFeatured === true
        )
      : []

  const resourcesCategoriesData =
    resourcesCategories && resourcesCategories.data
      ? resourcesCategories.data
      : []

  const resourcesPageData =
    resourcesPage && resourcesPage.data ? resourcesPage.data : []

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex relative flex-col items-center justify-center gap-8 overflow-x-hidden w-full px-4 md:px-24 sm:pt-[200px] py-12 md:py-40 mx-auto'>
        <div className='absolute -z-10 -top-[30vh] h-screen w-full scale-150'>
          <Image
            src={HeaderBackground}
            alt='header background'
            fill
            style={{ objectFit: 'cover', objectPosition: 'bottom' }}
          />
        </div>
        <div className='w-full flex flex-col justify-center gap-8 md:max-w-[1440px]'>
          <ResourcesCategories categories={resourcesCategoriesData} />
          <div className='flex flex-col z-0 gap-24'>
            <FeaturedSection featured={featuredResourcesData} />
            <ResourcesSection resourcesData={resourcesPageData} />
            <section className='w-full flex items-center justify-center'>
              <NewsletterCard />
            </section>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default ResourcesPage
