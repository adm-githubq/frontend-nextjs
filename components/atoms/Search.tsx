import { useState, useEffect, useRef, Key } from 'react'
import Image from 'next/image'
import { InlineForm } from '@/components/atoms/InlineForm'
import { debounce } from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchBox, useInstantSearch } from 'react-instantsearch'

interface SearchResults {
  thumbnail: string
  title: string
  content: string
  slug: string
}

const highlightWord = (originalString: string, queryWord: string) => {
  // Find the index of the query word in the original string
  const index = originalString.toLowerCase().indexOf(queryWord.toLowerCase())
  if (index === -1) {
    // Query word not found in original string
    return originalString.substring(0, 140) + '...'
  }
  // Extract the word and a few words before and after it
  const start = Math.max(0, index - 140)
  const end = Math.min(originalString.length, index + queryWord.length + 140)
  const highlightedString =
    '...' +
    originalString.substring(start, index) +
    '<mark>' +
    originalString.substring(index, index + queryWord.length) +
    '</mark>' +
    originalString.substring(index + queryWord.length, end) +
    '...'
  return highlightedString
}

const Search = () => {
  const { query, refine } = useSearchBox()
  const [searchQuery, setSearchQuery] = useState<string>(query)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const { status, results } = useInstantSearch()

  const handleSearchRequest = async (query: string) => refine(query)

  const debouncedSearchRef = useRef(
    debounce((query: string) => {
      handleSearchRequest(query).then(res => {
        searchInputRef.current?.blur()
      })
    }, 500)
  )

  const handleQueryChange = (e: any) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (searchQuery.length >= 3) {
      debouncedSearchRef.current(searchQuery)
    }
  }, [searchQuery])

  const handleSubmit = (data: any) => {
    searchInputRef.current?.blur()
    setSearchQuery(data.searchQuery)
    debouncedSearchRef.current(searchQuery)
  }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [resultsRef])

  return (
    <div className='flex min-w-[300px] justify-center items-center flex-grow relative'>
      <InlineForm
        inputProps={{
          id: 'searchQuery',
          name: 'searchQuery',
          placeholder: 'Search'
        }}
        onSubmit={handleSubmit}
        query={searchQuery}
        buttonText='Search'
        buttonSize='small'
        onChange={handleQueryChange}
      />
      <AnimatePresence>
        {results && results.hits.length > 0 && searchQuery ? (
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
            ref={resultsRef}
            className={`absolute flex flex-col gap-4 bg-white w-full top-[4rem] rounded-2xl overflow-hidden p-8`}
          >
            {results.hits.map((result: SearchResults, index: Key) => (
              <Link
                href={`/resources/${result.slug}`}
                key={index}
                className='flex flex-wrap gap-8 border-b-2  border-gray-200 pb-4 last:border-none'
              >
                <Image
                  src={'https://' + result.thumbnail.slice(8, undefined)}
                  alt={result.title}
                  height={301}
                  width={452}
                  className='object-cover object-left md:w-1/3 rounded-xl'
                />

                <div className='flex flex-col flex-grow w-1/3 justify-center'>
                  <h4 className='text-xl font-bold'>{result.title}</h4>
                  <div
                    className='mt-4'
                    dangerouslySetInnerHTML={{
                      __html: result.content.slice(0, 140)
                    }}
                  />
                </div>
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Search
