'use client'

import { useState } from 'react'
import { ChevronIcon } from '@/public/icons/ChevronIcon'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  menuItemStyle: string
  onMenuSelect?: (pathname: string) => void
}

export const ServicesDropdown: React.FC<Props> = ({
  menuItemStyle,
  onMenuSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleExpand = () => {
    setIsExpanded(isExpanded => !isExpanded)
  }

  return (
    <button
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onTouchEnd={handleExpand}
    >
      <div
        className={` group cursor-default flex flex-col md:flex-row md:items-center ${menuItemStyle} duration-200 ease-in-out relative`}
      >
        <span className='hidden md:block z-10 nav-item p-4 pr-0 uppercase'>
          Services
        </span>
        <div className='z-10 flex items-center gap-2 md:hidden'>
          <span className='z-10 nav-item md:p-4 md:pr-0 md:uppercase'>
            Services
          </span>
          <ChevronIcon
            className={` ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            } text-gray-700 duration-300 ease-in-out`}
          />
        </div>
        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              initial={{
                opacity: 0,

                transform: 'translateY(-10px)'
              }}
              animate={{
                opacity: 1,

                transform: 'translateY(0px)'
              }}
              exit={{
                opacity: 0,

                transform: 'translateY(-10px)'
              }}
              transition={{ duration: 0.3, ease: 'backInOut' }}
              className='md:absolute md:top-14 md:left-0 z-20'
            >
              <ul className=' flex flex-col items-start md:justify-center gap-6 md:gap-8 bg-white w-full px-4 pt-4 md:p-8 md:rounded-md md:shadow-md md:w-[400px]'>
                <li
                  onClick={
                    onMenuSelect
                      ? () => onMenuSelect('/services/coparenting')
                      : () => {}
                  }
                >
                  <Link
                    className={
                      onMenuSelect
                        ? 'pointer-events: none; tab-index: -1; aria-disabled: true'
                        : ''
                    }
                    href='/services/co-parenting'
                  >
                    <p className='nav-item text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'>
                      Synchronous CoParenting
                    </p>
                  </Link>
                </li>
                <li
                  onClick={
                    onMenuSelect
                      ? () => onMenuSelect('/services/divorce')
                      : () => {}
                  }
                >
                  <Link
                    className={
                      onMenuSelect
                        ? 'pointer-events: none; tab-index: -1; aria-disabled: true'
                        : ''
                    }
                    href='/services/divorce'
                  >
                    <p className='nav-item text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'>
                      Divorce + Separation Coaching
                    </p>
                  </Link>
                </li>
                <li
                  onClick={
                    onMenuSelect
                      ? () => onMenuSelect('/services/mediation')
                      : () => {}
                  }
                >
                  <Link
                    className={
                      onMenuSelect
                        ? 'pointer-events: none; tab-index: -1; aria-disabled: true'
                        : ''
                    }
                    href='/services/mediation'
                  >
                    <p className='nav-item text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'>
                      360° Mediation
                    </p>
                  </Link>
                </li>
                <li
                  onClick={
                    onMenuSelect
                      ? () => onMenuSelect('/services/coaching')
                      : () => {}
                  }
                >
                  <Link
                    className={
                      onMenuSelect
                        ? 'pointer-events: none; tab-index: -1; aria-disabled: true'
                        : ''
                    }
                    href='/services/coaching'
                  >
                    <p className='nav-item text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'>
                      Coaching for Professionals
                    </p>
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </button>
  )
}
