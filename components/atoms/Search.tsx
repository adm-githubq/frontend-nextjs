import { useState, useEffect, useRef, Key } from 'react'
import Image from 'next/image'
import { InlineForm } from '@/components/atoms/InlineForm'
import { debounce, set } from 'lodash'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

interface SearchResults {
  image: string
  title: string
  contents: string
  postAddress: string
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
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [results, setResults] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const resultsRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const handleSearchRequest = async (query: string) => {
    const searchEngineUrl = process.env.NEXT_PUBLIC_SE_API_URL
    const response = await fetch(
      `${searchEngineUrl}/indexes/blog-post/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SE_API_KEY}`
        },
        body: JSON.stringify({
          q: query,
          limit: 100
        })
      }
    )
    setSearchVisible(true)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return data.hits.map((item: any) => ({
      image: item.FeaturedImage.formats.small.url,
      title: item.PostTitle,
      contents: highlightWord(
        item.PostContentEditor.replace(/(<([^>]+)>)/gi, ''),
        query
      ),
      postAddress: item.PostAddress
    }))
  }

  const debouncedSearchRef = useRef(
    debounce((query: string) => {
      setLoading(true)
      handleSearchRequest(query).then(res => {
        setResults(res)
        setLoading(false)
        searchInputRef.current?.blur()
      })
    }, 1000)
  )

  const handleQueryChange = (e: any) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (searchQuery.length >= 3) {
      debouncedSearchRef.current(searchQuery)
    }
    setSearchVisible(false)
  }, [searchQuery])

  const handleSubmit = (data: any) => {
    searchInputRef.current?.blur()
    setSearchQuery(data.searchQuery)
    debouncedSearchRef.current(searchQuery)
    setSearchVisible(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setSearchVisible(false)
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
        {searchVisible ? (
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
            {results.map((result: SearchResults, index: Key) => (
              <Link
                href={`/resources/${result.postAddress}`}
                key={index}
                className='flex flex-wrap gap-8 border-b-2  border-gray-200 pb-4 last:border-none'
              >
                <Image
                  src={result.image}
                  alt={result.title}
                  height={500}
                  width={500}
                  className='object-cover object-left md:w-1/3 rounded-xl'
                />

                <div className='flex flex-col flex-grow w-1/3 justify-center'>
                  <h4 className='text-xl font-bold'>{result.title}</h4>
                  <div
                    className='mt-4'
                    dangerouslySetInnerHTML={{ __html: result.contents }}
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
