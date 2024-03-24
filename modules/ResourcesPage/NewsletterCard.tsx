'use client'

import { InlineForm } from '@/components/atoms/InlineForm'
import { LetterIcon } from '@/public/icons/LetterIcon'
import { useState } from 'react'

export const NewsletterCard = () => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const handleSubmitEmail = async (data: any) => {
    setLoading(true) // start loading
    setResponse('') // reset response
    setError('') // reset error
    try {
      const response = await fetch(
        'https://cms.quantumadr.com/api/subscribers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: data })
        }
      )

      if (!response.ok) {
        // check if HTTP status is not successful
        throw new Error('Network response was not ok')
      }

      setResponse('Email submitted successfully!') // set success message
    } catch (error) {
      setError('Provided e-mail has to be a valid e-mail address.') // set error message
    } finally {
      setLoading(false) // end loading
    }
  }

  return (
    <div className='w-full p-8 md:p-12 flex flex-col md:flex-row gap-6 bg-gradient-to-tr from-primary from-30% to-secondary rounded-xl'>
      <div className='flex flex-col justify-center gap-6  mr-auto'>
        <div className='flex gap-2 items-center text-sm md:text-lg font-bold uppercase text-white'>
          <LetterIcon />
          <span>Stay in touch</span>
        </div>
        <h2 className=' text-2xl text-center md:text-3xl md:text-left font-bold text-white'>
          Sign up for Quantum insights
        </h2>
      </div>
      <div className='flex justify-end items-center md:w-[480px]'>
        <InlineForm
          inputProps={{ id: 'email', name: 'email', placeholder: 'Email' }}
          buttonText='Submit'
          buttonBgColor='black'
          onSubmit={handleSubmitEmail}
          loading={loading}
          error={error}
          response={response}
        />
        <div id='__next'></div>
      </div>
    </div>
  )
}
