'use client'
import { PopupButton } from 'react-calendly'
import { useEffect, useState } from 'react'

export interface CalendlyButtonProps {
  buttonContents?: string | undefined
}

export const Calendly: React.FC<CalendlyButtonProps> = ({ buttonContents }) => {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== 'undefined') {
      setRootElement(document.getElementById('__next'))
    }
  }, [])

  return (
    <div className='cal_div'>
      <PopupButton
        className='rounded-full hidden bg-gray-900 py-4 px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-gray-900/80 hover:scale-105'
        url='https://calendly.com/d/42s-sws-3qw/quantum-adr-founder-introductions'
        rootElement={rootElement as HTMLElement}
        text={buttonContents || 'Get in Touch'}
      />
    </div>
  )
}
