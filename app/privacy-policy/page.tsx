import Image from 'next/image'
import HeaderBackground from '@/public/HeaderBackground_v2.svg'

const getPrivacyPolicyPageData = async () => {
  const privacyPolicyPageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/privacy-policy`,
  )
  if (!privacyPolicyPageData.ok) {
    throw new Error('Failed to fetch home page data')
  }
  return privacyPolicyPageData.json()
}

const PrivacyPolicyPage = async () => {
  const privacyPolicyData = await getPrivacyPolicyPageData()

  const title = privacyPolicyData.data.attributes.PageTitle
  const content = privacyPolicyData.data.attributes.PageContent

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

export default PrivacyPolicyPage
