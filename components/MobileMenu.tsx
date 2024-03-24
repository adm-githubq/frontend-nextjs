'use client'

import { ServicesDropdown } from '@/components/ServicesDropdown'
import LogoBlack from '@/public/Quantum-ADR-black.svg'
import LogoWhite from '@/public/Quantum-ADR-white.svg'
import { CrossIcon } from '@/public/icons/CrossIcon'
import { HamburgerIcon } from '@/public/icons/HamburgerIcon'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
const MobileMenu = () => {
  const [navOpen, setNavOpen] = useState(false)

  const { push } = useRouter()

  const handleNavOpen = () => {
    setNavOpen(true)
  }

  const handleMenuSelect = (pathname: string) => {
    push(pathname)
    setNavOpen(false)
  }

  const handleNavClose = () => {
    setNavOpen(false)
  }

  const menuItemStyle =
    'text-black hover:text-gray-700 after:bg-white [&_svg]:stroke-gray-700'
  return (
    <>
      <div className='flex justify-between items-center bg-primary px-4 py-4 w-full md:hidden '>
        <Link href={'/'}>
          <Image src={LogoWhite} alt='logo' width={220} height={52} />
        </Link>
        <div
          className='w-12 h-12 flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300'
          onClick={handleNavOpen}
        >
          <HamburgerIcon />
        </div>
      </div>
      {navOpen ? (
        <div
          className='bg-black opacity-60 fixed top-0 bottom-0 right-0 left-0 z-10 md:hidden'
          onClick={handleNavClose}
        />
      ) : null}
      <AnimatePresence>
        {navOpen ? (
          <motion.nav
            key={'mobile-menu'}
            initial={{
              opacity: 0,
              transform: 'translateX(-100%)'
            }}
            animate={{
              opacity: 1,
              transform: 'translateX(0)'
            }}
            exit={{
              opacity: 0,
              transform: 'translateX(-100%)'
            }}
            transition={{ duration: 0.3, ease: 'backInOut' }}
            className='flex flex-col bg-white w-[95%] h-screen absolute top-0 left-0 z-20 md:hidden'
          >
            <div className='flex justify-between items-center px-4 py-4 w-full md:hidden  '>
              <Image
                src={LogoBlack}
                alt='logo'
                width={220}
                height={52}
                onClick={() => handleMenuSelect('/')}
              />
              <div
                className='w-12 h-12 flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300'
                onClick={handleNavClose}
              >
                <CrossIcon />
              </div>
            </div>
            <ul className='flex flex-col gap-8 p-8'>
              <li>
                <ServicesDropdown
                  menuItemStyle={menuItemStyle}
                  onMenuSelect={handleNavClose}
                />
              </li>
              <li onClick={() => handleMenuSelect('/about')}>
                <p className='nav-item'>About</p>
              </li>
              <li
                onClick={() => handleMenuSelect('/resources')}
                className='mr-3'
              >
                <p className='nav-item'>Resources</p>
              </li>
              {/* <li>
                <CalendlyWrapper buttonContents='Get In Touch' />
                <div id='__next'></div>
              </li> */}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default MobileMenu
