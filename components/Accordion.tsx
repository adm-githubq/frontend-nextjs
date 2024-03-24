'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronIcon } from '@/public/icons/ChevronIcon'

export interface Expandable {
  id: number
  ExpandableTitle: string
  ExpandableContent: string
}

export interface AccordionProps {
  expandables: Expandable[]
}

export const Accordion: React.FC<AccordionProps> = ({ expandables = [] }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const expandableStyleClasses = (id: number): string => {
    if (selectedId === id) {
      return 'bg-primary text-white '
    } else {
      return 'bg-white text-gray-900'
    }
  }

  const toggleExpand = (id: number) => {
    if (selectedId === id) {
      setSelectedId(null)
    } else {
      setSelectedId(id)
    }
  }

  return (
    <div className='flex flex-col gap-4 w-full md:w-[564px]'>
      {expandables.map(expandable => {
        const isBreakable = expandable.ExpandableTitle.split(',').length > 1
        return (
          <div
            key={expandable.id}
            className='shadow-expandable-shadow rounded-xl w-full text-left overflow-hidden'
          >
            <button
              onClick={() => toggleExpand(expandable.id)}
              className='rounded-xl w-full text-left '
            >
              <div
                className={`${expandableStyleClasses(
                  expandable.id
                )} px-6 py-4 font-bold text-lg w-full flex justify-between gap-4 items-center`}
              >
                <h3 className='hidden md:block w-[90%]'>
                  {expandable.ExpandableTitle}
                </h3>
                {isBreakable ? (
                  <h3 className='md:hidden w-[90%]'>
                    {expandable.ExpandableTitle.split(',')[0]}
                    {','}
                    {<br />}
                    {expandable.ExpandableTitle.split(',')[1]}
                  </h3>
                ) : (
                  <h3 className='md:hidden w-[90%]'>
                    {expandable.ExpandableTitle}
                  </h3>
                )}
                <ChevronIcon
                  className={`w-6 h-6 duration-300 ease-in-out ${
                    selectedId === expandable.id
                      ? 'stroke-white '
                      : 'stroke-primary rotate-180'
                  }`}
                />
              </div>
              <AnimatePresence>
                {selectedId === expandable.id ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className='bg-white text-gray-900 drop-shadow-lg'
                  >
                    <p className='px-6 py-4 '>{expandable.ExpandableContent}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </button>
          </div>
        )
      })}
    </div>
  )
}
