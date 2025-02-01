import Image from 'next/image'
import Link from 'next/link'
import { marked } from 'marked'

//import LogoWhite from '@/public/Quantum-ADR-white.svg'

import { LinkedinIcon } from '@/public/icons/LinkedinIcon'
import { InstagramIcon } from '@/public/icons/InstagramIcon'
import { FacebookIcon } from '@/public/icons/FacebookIcon'
import { TwitterIcon } from '@/components/atoms/TwitterIcon'
import qs from 'qs'

const Footer = async () => {
  const footerQuery = qs.stringify(
    {
      populate: {
        footer_socials: '*',
        site_logos: {
          populate: ['desktop_logo_light']
        }
      }
    },
    {
      encodeValuesOnly: true
    }
  )

  const {
    data: {
      attributes: { footer_socials, footer_disclaimer, site_logos }
    }
  } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/site-setting?${footerQuery}`
  ).then(res => res.json())

  const menuItemStyle =
    'text-white after:bg-white [&_svg]:stroke-white [&_svg]:hover:stroke-gray-700'

  const menuLinks = [
    { name: 'Services', link: '/#services' },
    { name: 'Resources', link: '/resources' },
    { name: 'About', link: '/about' }
  ]

  const otherLinks = [
    { name: 'Privacy Policy', link: '/privacy-policy' },
    { name: 'Terms of Use', link: '/terms-of-service' }
  ]

  const smLinks = {
    linkedin: {
      name: 'LinkedIn',
      icon: <LinkedinIcon />
    },
    instagram: {
      name: 'Instagram',
      icon: <InstagramIcon />
    },
    facebook: {
      name: 'Facebook',
      icon: <FacebookIcon />
    },
    twitter: {
      name: 'Twitter',
      icon: <TwitterIcon />
    }
  }

  return (
    <div className='bg-[url("/FooterBackground.svg")] bg-contain md:bg-cover bg-no-repeat md:h-[510px] w-full h-full mt-auto flex flex-col md:flex-row justify-center md:overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 w-full md:max-w-[1440px] h-full md:h-[400px] md:overflow-hidden mt-24 md:mt-36 pt-6 pb-24 md:py-6 bg-[#212427] pr-6'>
        <div className='flex flex-col items-center md:items-start gap-6 w-full px-6 md:px-24'>
          <Image
            src={site_logos.desktop_logo_light.data.attributes.url}
            alt='logo'
            height={48}
            width={222}
          />
          <p className='text-white italic text-center tracking-tight leading-6 md:text-left md:w-[444px]'
              dangerouslySetInnerHTML={{
                __html: marked.parseInline(footer_disclaimer)
              }}
            />
        </div>
        <div className='flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-16 w-full'>
          <div className='flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-1/2'>
            <h3 className='text-white font-bold text-lg'>Menu</h3>
            {menuLinks.map(item => (
              <Link key={item.name} href={item.link}>
                <span
                  className={`${menuItemStyle} nav-item !font-light !text-base`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className='flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-1/2'>
            <h3 className='text-white font-bold text-lg'>Other</h3>
            {otherLinks.map(item => (
              <Link key={item.name} href={item.link}>
                <span
                  className={`${menuItemStyle} nav-item !font-light !text-base`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className='flex flex-col items-center md:items-start gap-4 md:gap-6 w-full md:w-1/2'>
            <div className='flex gap-4 items-center'>
              {footer_socials.map((item: any) => (
                <Link
                  key={item.platform}
                  href={item.url}
                  target='_blank'
                  rel='noreferrer'
                  className={`${menuItemStyle} nav-item !font-light !text-base p-1`}
                >
                  {
                    // @ts-ignore
                    smLinks[item.platform as string].icon
                  }
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
