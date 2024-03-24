import { CopyIcon } from '@/public/icons/CopyIcon'
import { FacebookIcon } from '@/public/icons/FacebookIcon'
import { LinkedinIcon } from '@/public/icons/LinkedinIcon'
import { ShareIcon } from '@/public/icons/ShareIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'

interface ShareButtonProps {
  postAddress?: string
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export const ShareButton: React.FC<ShareButtonProps> = ({ postAddress }) => {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const handleShareOptions = () => {
    setShowShareOptions(!showShareOptions)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(APP_URL + '/resources/' + postAddress)
    setLinkCopied(true)
    setTimeout(() => {
      setLinkCopied(false)
    }, 3000)
  }

  return (
    <div className='relative'>
      <button
        className='w-12 h-12 rounded-full bg-white text-black flex justify-center items-center border border-black hover:bg-gray-200'
        onClick={handleShareOptions}
      >
        <ShareIcon className='stroke-gray-900' />
      </button>
      {showShareOptions ? (
        <div
          onMouseLeave={() => setShowShareOptions(false)}
          className='flex flex-col absolute top-16 -right-16 z-10 bg-white w-56 h-auto gap-2 py-2border border-gray-100 rounded-md shadow-gray-300/60 shadow-xl'
        >
          <AnimatePresence>
            {showShareOptions ? (
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
                onMouseLeave={() => setShowShareOptions(false)}
                className='flex flex-col absolute p-2 right-10 md:-right-16 z-10 bg-white w-56 h-auto gap-2 py-2 border border-gray-100 rounded-md shadow-gray-300/50 shadow-2xl'
              >
                <button
                  className={`flex gap-4 items-center p-2 h-full rounded-lg duration-200 ${
                    linkCopied ? 'bg-lime-500 text-white ' : 'bg-white'
                  }`}
                  onClick={handleCopyLink}
                >
                  <CopyIcon
                    className={`${
                      linkCopied ? 'stroke-white' : 'stroke-gray-900'
                    } `}
                  />
                  <span>{linkCopied ? 'Link Copied' : 'Copy link'}</span>
                </button>
                <FacebookShareButton
                  style={{ padding: '8px' }}
                  className='flex gap-4 items-center p-2 h-full rounded-lg'
                  url={`${APP_URL}/resources/${postAddress}`}
                >
                  <FacebookIcon stroke={'black'} />{' '}
                  <span>Share to Facebook</span>
                </FacebookShareButton>
                <LinkedinShareButton
                  style={{ padding: '8px' }}
                  className='flex gap-4 items-center rounded-lg hover:bg-gray-400'
                  url={`${APP_URL}/resources/${postAddress}`}
                >
                  <LinkedinIcon stroke={'black'} />
                  <span>Share to LinkedIn</span>
                </LinkedinShareButton>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  )
}
