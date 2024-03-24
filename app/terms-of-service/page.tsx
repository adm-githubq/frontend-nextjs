import Image from 'next/image'
import HeaderBackground from '@/public/HeaderBackground_v2.svg'

const getTermsOfServicePageData = async () => {
  const termsOfServicePageData = await fetch(
    'https://cms.quantumadr.com/api/terms-of-service',
    { next: { revalidate: 0 } }
  )
  if (!termsOfServicePageData.ok) {
    throw new Error('Failed to fetch home page data')
  }
  return termsOfServicePageData.json()
}

const TermsOfServicePage = async () => {
  const termsOfServiceData = await getTermsOfServicePageData()

  const title = termsOfServiceData.data.attributes.PageTitle
  const content = termsOfServiceData.data.attributes.PostContents

  return (
    <main className='flex flex-col items-center p-4 md:p-24 overflow-x-hidden '>
      <div className='absolute -z-10 -top-[30vh] h-screen w-full'>
        <Image
          src={HeaderBackground}
          alt='header background'
          fill
          style={{ objectFit: 'cover', objectPosition: 'bottom' }}
        />
      </div>
      <section className='max-w-[1152] w-full px-6 py-6 md:px-24 md:py-24 my-4 md:my-24 rounded-3xl bg-white shadow-lg shadow-gray-300'>
        {/* <h2 className='text-3xl leading-[48px] font-bold text-black'>
          {title}
        </h2> */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    </main>
  )
}

export default TermsOfServicePage
