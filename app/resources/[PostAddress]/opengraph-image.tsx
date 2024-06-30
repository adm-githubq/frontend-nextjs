import { ImageResponse } from 'next/og'

const getResourcePageData = async (PostAddress: string) => {
  const resourcesPageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog-posts?filters[PostAddress][$eq]=${PostAddress}&populate=*`,
    { next: { revalidate: 3600 } }
  )
  if (!resourcesPageData.ok) {
    throw new Error('Failed to fetch resources page data')
  }
  return resourcesPageData.json()
}

const generateImageMetadata = async ({
  params
}: {
  params: { PostAddress: string }
}) => {
  const image = await getResourcePageData(params.PostAddress)
  const featuredImage = {
    url: image.data[0].attributes.FeaturedImage.data.attributes.formats.large
      ? image.data[0].attributes.FeaturedImage.data.attributes.formats.large.url
      : image?.data[0]?.attributes?.FeaturedImage?.data?.attributes?.url,
    size: { width: 1200, height: 600 },
    alt: image.data[0].attributes.PostTitle,
    contentType: 'image/png'
  }

  return featuredImage
}

export const size = {
  width: 1200,
  height: 600
}

export const contentType = 'image/png'

export default async function Image({
  params
}: {
  params: { PostAddress: string }
  id: number
}) {
  const strapiImage = await generateImageMetadata({ params })
  //const data = await getResourcePageData(params.PostAddress)
  //const text = data.data[0].attributes.PostTitle

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '600px',
          display: 'flex'
        }}
      >
        <img
          src={strapiImage.url}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600
    }
  )
}
