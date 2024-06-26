'use client'

import { ResourceCategory } from '@/app/resources/page'
import Search from '@/components/atoms/Search'
import { getResourcesCategories } from '@/core/resources'
import { ResourcesCategoriesDropdown } from '@/modules/ResourcesPage/ResourcesCategoriesDropdown'
import algoliasearch from 'algoliasearch/lite'
import { useSearchParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { InstantSearch } from 'react-instantsearch'

interface ResourcesTitlesProps {
  categories: ResourceCategory[]
  data?: any
}

const searchClient = algoliasearch(
  'UW17VULHQZ',
  '3b57fe7f82911892d347c22628014b8a'
)

export const ResourcesCategories = ({ categories }: ResourcesTitlesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null)
  const params = useSearchParams()

  const categoryId = params.get('category')
  const checkedCategory = categories.find(category => category.id == categoryId)

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(checkedCategory)
    } else {
      setSelectedCategory(null)
    }
  }, [categoryId])
  // TODO: animate presence of the blogs when the category changes
  return (
    <div className='w-full flex flex-wrap gap-8 items-center relative z-10 md:max-w-[1440px] mx-auto  '>
      <div className='z-10'>
        <ResourcesCategoriesDropdown
          categories={getResourcesCategories(categories)}
        />
      </div>
      {selectedCategory ? (
        <div className='w-full md:w-fit'>
          <div className='border border-white rounded-full w-fit py-[10px] px-6 font-semibold text-lg text-white'>
            {selectedCategory.attributes.name}
          </div>
        </div>
      ) : null}

      <div className='z-9 flex-grow'>
      <InstantSearch searchClient={searchClient} indexName='Q-ADR-Blogs'>
        <Search />
      </InstantSearch>
      </div>
    </div>
  )
}
