'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { CalendlyWrapper } from './Calendly/CalendlyDynamic'
import CalendlyScript from './Calendly/CalendlyScript'
import { ServicesDropdown } from './ServicesDropdown'

// import Logo from '@/public/Quantum-ADR-black.svg'
// import LogoWhite from '@/public/Quantum-ADR-white-with-trademark.svg'

type Props = {
  header_logos: {
    mobile_logo: {
      data: {
        attributes: {
          url: string
        }
      } | null
    }
    desktop_logo_light: {
      data: {
        attributes: {
          url: string
        }
      } | null
    }
    desktop_logo_dark: {
      data: {
        attributes: {
          url: string
        }
      } | null
    }
  }
  services_menu_items: {
    data: {
      id: number
      attributes: {
        slug: string
        menu_text: string
      }
    }[]
  }
}

const DesktopMenu: React.FC<Props> = props => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navClass = isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
  const logoSrc =
    isScrolled && props.header_logos.desktop_logo_light?.data?.attributes?.url
        ? props.header_logos.desktop_logo_dark?.data?.attributes?.url
        : props.header_logos.desktop_logo_light?.data?.attributes?.url

  const menuItemStyle = isScrolled
    ? 'text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'
    : 'text-white hover:text-gray-700 after:bg-white [&_svg]:stroke-white [&_svg]:hover:stroke-gray-700'

  return (
    <nav
      className={`hidden md:flex fixed z-20 top-0 w-full px-10 max-w-[1440] justify-center bg-transparent transition-all duration-300 ease-in-out ${navClass}`}
    >
      <div className='flex w-full max-w-[1440px] items-center justify-between py-4 font-bold text-[16px]'>
      { logoSrc ? 
        <Link href='/'>
          <Image src={logoSrc} alt='logo' width={246} height={52} />
        </Link> : null }
        <ul className='flex items-center justify-around gap-16 py-4 pb-4'>
          <li>
            <ServicesDropdown
              menuItemStyle={menuItemStyle}
              services_menu_items={props.services_menu_items}
            />
          </li>
          <li>
            <Link href='/about'>
              <p className={`${menuItemStyle} nav-item`}>ABOUT</p>
            </Link>
          </li>
          <li className='mr-3'>
            <Link href='/resources'>
              <p className={`${menuItemStyle} nav-item`}>RESOURCES</p>
            </Link>
          </li>
          <li>
            {/* We need both of those to correctly establish a root element to which the calendly overlay attaches */}
            <CalendlyWrapper />
            <CalendlyScript />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default DesktopMenu
