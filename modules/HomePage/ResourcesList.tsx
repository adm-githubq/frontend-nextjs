'use client'

import { Card } from '@/components/atoms/Card'
import { Resource } from '@/core/resources'

interface ResourcesListProps {
  resourcesList: Resource[]
}

export const ResourcesList = ({ resourcesList }: ResourcesListProps) => {
  return (
    <div className='w-full px-4 flex flex-col gap-4 xl:gap-8 2xl:gap-12 items-center md:flex-row md:justify-between md:flex-wrap md:px-24 max-w-[1440px]'>
      {resourcesList.map(item => (
        <Card
          key={item.id}
          linkUrl={`/resources/${item.PostAddress}`}
          imgUrl={item.thumbnail ?? ''}
          title={item.title}
          resourceType={item.ResourceType}
          resourceLabelColor={item.ResourceLabelColor}
        />
      ))}
    </div>
  )
}
