'use client'

import { useForm } from 'react-hook-form'
import Button from '@/components/atoms/Button'
import Image from 'next/image'
import QuantumSignet from '@/public/quantum-signet.svg'

interface InputProps {
  id: string
  name: string
  label?: string
  placeholder?: string
  onChange?: () => void
  value?: string
  type?: string
  required?: boolean
  autoComplete?: string
  disabled?: boolean
}

interface InlineFormProps {
  onSubmit: (data?: any) => void
  inputProps: InputProps
  query?: string
  buttonBgColor?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'black'
    | 'transparent'
    | 'white'
  buttonText?: string
  buttonSize?: 'small' | 'normal' | 'large'
  width?: string
  loading?: boolean
  error?: string
  response?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InlineForm = ({
  inputProps,
  onSubmit,
  buttonText,
  buttonSize,
  buttonBgColor,
  loading,
  error,
  response,
  onChange
}: InlineFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // TODO: Add validation

  return (
    <form
      className='w-full flex flex-col justify-center gap-2 duration-200 transition-all'
      onSubmit={handleSubmit(onSubmit)}
    >
      {loading ? (
        <Image
          src={QuantumSignet}
          height={100}
          width={100}
          alt='Quantum logo'
          className='animate-pulse'
        />
      ) : (
        <div className='w-full flex rounded-full bg-white p-1'>
          <input
            {...register(inputProps.name)}
            {...inputProps}
            onChange={onChange}
            className='w-full px-4 py-2 rounded-full text-lg font-bold text-black placeholder:text-black/50 placeholder:font-thin bg-white border-none outline-none'
          />

          <Button
            size={buttonSize ?? 'normal'}
            type='submit'
            color={buttonBgColor ?? 'white'}
          >
            {buttonText}
          </Button>
        </div>
      )}
      {error ? <span className='text-red-500 ml-2'>{error}</span> : null}
      {response ? <span className='text-gray-700 ml-5'>{response}</span> : null}
    </form>
  )
}
