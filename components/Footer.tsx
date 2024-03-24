import Image from 'next/image'
import Link from 'next/link'

import LogoWhite from '@/public/Quantum-ADR-white.svg'

import { LinkedinIcon } from '@/public/icons/LinkedinIcon'
import { InstagramIcon } from '@/public/icons/InstagramIcon'
import { FacebookIcon } from '@/public/icons/FacebookIcon'

const Footer = () => {
  const description = `Quantum™ ADR provides Coaching and Mediation services. 
  Our services are not a substitute for legal advice or therapy. Quantum™ ADR is not a law firm and does not provide legal services, psychotherapy, or marriage and family therapy. Contacting 
  or engaging Quantum™ ADR will not create an attorney-client, psychologist-patient, or therapist-patient relationship.`

  const menuItemStyle = 'text-white after:bg-white [&_svg]:stroke-white [&_svg]:hover:stroke-gray-700'

  const menuLinks = [
    { name: 'Services', link: '/#services' },
    { name: 'Resources', link: '/resources' },
    { name: 'About', link: '/about' }
  ]

  const otherLinks = [
    { name: 'Privacy Policy', link: '/privacy-policy' },
    { name: 'Terms of Service', link: '/terms-of-service' }
  ]

  const smLinks = [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/company/quantum-adr/',
      icon: <LinkedinIcon />
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/quantum.adr',
      icon: <InstagramIcon />
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/quantumadr',
      icon: <FacebookIcon />
    }
  ]

  return (
    <div className='bg-[url("/FooterBackground.svg")] bg-contain md:bg-cover bg-no-repeat md:h-[510px] w-full h-full mt-auto flex flex-col md:flex-row justify-center md:overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 w-full md:max-w-[1440px] h-full md:h-[400px] md:overflow-hidden mt-24 md:mt-36 pt-6 pb-24 md:py-6 bg-[#212427]'>
        <div className='flex flex-col items-center md:items-start gap-6 w-full px-6 md:px-24'>
          <Image src={LogoWhite} alt='logo' height={48} width={222} />
          <p className='text-white italic text-center tracking-tight leading-6 md:text-left md:w-[444px]'>{description}</p>
        </div>
        <div className='flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-16 w-full'>
          <div className='flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-1/2'>
            <h3 className='text-white font-bold text-lg'>Menu</h3>
            {menuLinks.map(item => (
              <Link key={item.name} href={item.link}>
                <span className={`${menuItemStyle} nav-item !font-light !text-base`}>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className='flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-1/2'>
            <h3 className='text-white font-bold text-lg'>Other</h3>
            {otherLinks.map(item => (
              <Link key={item.name} href={item.link}>
                <span className={`${menuItemStyle} nav-item !font-light !text-base`}>{item.name}</span>
              </Link>
            ))}
          </div>
          <div className='flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-1/2'>
            <div className='flex gap-4'>
              {smLinks.map(item => (
                <Link
                  key={item.name}
                  href={item.link}
                  target='_blank'
                  rel='noreferrer'
                  className={`${menuItemStyle} nav-item !font-light !text-base p-1`}
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer
