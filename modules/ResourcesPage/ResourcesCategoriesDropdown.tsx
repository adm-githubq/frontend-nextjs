import { useState } from 'react'
import { ChevronIcon } from '@/public/icons/ChevronIcon'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ResourceCategory } from '@/app/resources/page'
import { useSearchParams } from 'next/navigation'

interface Props {
  categories: ResourceCategory[]
}

export const ResourcesCategoriesDropdown: React.FC<Props> = ({
  categories
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const searchParams = useSearchParams()
  const categoryQueryID = searchParams.get('category')

  const menuItemStyle =
    'text-white hover:text-gray-700 hover:bg-white after:bg-white [&_svg]:stroke-white [&_svg]:hover:stroke-gray-700'

  const handleSelectCategory = () => {
    setIsExpanded(false)
  }

  return (
    <div className='relative p-1'>
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={` group cursor-default flex items-center justify-center border border-white rounded-full pr-4 pl-6 py-3 gap-2 ${menuItemStyle} duration-200 ease-in-out `}
      >
        <span className='uppercase font-bold'>Categories</span>
        <ChevronIcon className='rotate-180 group-hover:rotate-0 duration-300 ease-in-out' />
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
              className='absolute top-16 left-0 z-1'
            >
              <ul className='flex flex-col items-start justify-center gap-8 bg-white p-8 rounded-md shadow-md md:w-[400px] z-1000'>
                {categories.map(category => (
                  <li
                    key={category.name}
                    onClick={handleSelectCategory}
                    className='w-full'
                  >
                    <Link
                      href={`/resources?category=${category.id}`}
                      className='flex items-center justify-between w-full'
                    >
                      <p className='nav-item text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'>
                        {category.name}
                      </p>
                    </Link>
                  </li>
                ))}
                <li className='w-full'>
                  <Link
                    href={`/resources`}
                    className='flex items-center justify-between w-full'
                  >
                    <p className='nav-item text-gray-700 hover:text-[#0D9BFC] after:bg-gradient-primary [&_svg]:stroke-gray-900 [&_svg]:hover:stroke-primary'>
                      All
                    </p>
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
