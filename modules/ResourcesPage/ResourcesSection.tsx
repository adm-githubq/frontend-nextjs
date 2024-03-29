'use client'

import { Card } from '@/components/atoms/Card'
import { getResources } from '@/core/resources'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface resourcesListProps {
  resourcesData: any
}

export const ResourcesSection = ({ resourcesData }: resourcesListProps) => {
  const [resources, setResources] = useState(getResources(resourcesData))

  const params = useSearchParams()
  const categoryId = params.get('category')

  const fetchFilteredResources = async () => {
    const filteredResources = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog-posts?populate[0]=categories&filters[categories][id][$eq]=${categoryId}&populate[1]=FeaturedImage,Thumbnail`,
      { next: { revalidate: 0 } }
    )
    if (!filteredResources.ok) {
      throw new Error('Failed to fetch filtered resources')
    }
    return filteredResources.json()
  }

  useEffect(() => {
    if (categoryId) {
      fetchFilteredResources().then((data: any) => {
        setResources(getResources(data.data))
      })
    } else {
      setResources(getResources(resourcesData))
    }
  }, [categoryId])

  return (
    <section
      className='w-full flex flex-col justify-center gap-8'
      id='resources-section'
    >
      <h2 className='w-full text-2xl md:text-4xl font-bold '>Blogs</h2>
      <div className='w-full flex flex-col items-center gap-6 md:gap-x-0 md:flex-row md:justify-between md:flex-wrap'>
        {resources.map(item => (
          <Card
            key={item.id}
            linkUrl={`/resources/${item.PostAddress}`}
            imgUrl={item.thumbnail ?? ''}
            title={item.title ?? ''}
            resourceType={(item.ResourceType as string) || 'Blog'}
            resourceLabelColor={item.ResourceLabelColor || 'black'}
          />
        ))}
      </div>
    </section>
  )
}
