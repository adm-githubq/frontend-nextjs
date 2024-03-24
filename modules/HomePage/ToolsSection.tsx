import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/atoms/Button'
import { ResourcesList } from '@/modules/HomePage/ResourcesList'
import { ToolListItem } from '@/modules/HomePage/ToolListItem'

import LinesBackground from '@/public/Lines-background.svg'
import { Resource } from '@/core/resources'

interface ToolsSectionProps {
  title: string
  toolsList: {
    id: string
    BubbleContent: string
  }[]
  resourcesList: Resource[]
  buttonText: string
}

export const ToolsSection = ({
  title,
  toolsList = [],
  resourcesList,
  buttonText
}: ToolsSectionProps) => {
  return (
    <section
      id='tools'
      className='w-full flex flex-col items-center justify-center gap-[64px] py-8 md:py-16 relative'
    >
      <div className='absolute w-screen h-full -z-10 left-0 bottom-[28%] scale-125'>
        <Image
          src={LinesBackground}
          alt={'wavy background lines'}
          fill
          className='hidden md:block'
        />
      </div>
      <h2 className='flex items-center justify-center text-2xl md:text-4xl font-bold text-center leading-[50px] mx-4 md:w-1/2 py-4'>
        {title}
      </h2>
      <div className='w-full flex items-center justify-center relative md:mb-6 2xl:mb-24'>
        <div className='w-full flex flex-col lg:flex-row items-center justify-between px-4 pt-8 md:pt-0 md:px-24 max-w-[1440px]'>
          {toolsList.map((item, index) => (
            <ToolListItem
              key={item.id}
              title={item.BubbleContent}
              isOdd={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
      <ResourcesList resourcesList={resourcesList} />
      <Link href='/resources'>
        <Button size='large' color='black'>
          {buttonText}
        </Button>
      </Link>
    </section>
  )
}
