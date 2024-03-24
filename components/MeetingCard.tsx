'use client'

import Link from 'next/link'
import { CalendlyWrapper } from './Calendly/CalendlyDynamic'
import CalendlyScript from './Calendly/CalendlyScript'
import Button from './atoms/Button'

interface MeetingCardProps {
  title?: string
  description?: string
  onClick?: () => void
  buttonText?: string
  calendly?: boolean
}
export const MeetingCard: React.FC<MeetingCardProps> = ({
  buttonText,
  calendly
}) => {
  const title = 'We’d love to meet you!'
  const description =
    'Book a free 15-minute introduction with our founders to discuss a plan that works for you.'

  return (
    <div className='w-full py-12 px-4 md:px-12 flex flex-wrap bg-gradient-to-tr justify-center md:justify-between gap-8 max-w-[1152px] min-h-[244px] from-primary from-30% to-secondary rounded-xl'>
      <div className='flex flex-col justify-center items-center sm:items-start gap-4 min-w-[300px] w-3/5'>
        <div className='text-center sm:text-left text-2xl md:text-4xl font-bold text-white'>
          {title}
        </div>
        <div className='text-center sm:text-left text-lg md:text-xl text-white w-full sm:w-3/4'>
          {description}
        </div>
      </div>
      <div className='flex justify-center md:justify-end items-center'>
        {calendly ? (
          <CalendlyScript buttonContents={buttonText} />
        ) : (
          <Link href='/about'>
            <Button color='black' type='button' size='large'>
              {buttonText}
            </Button>
          </Link>
        )}
        <div id='__next'></div>
      </div>
    </div>
  )
}
