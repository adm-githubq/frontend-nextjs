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

export const generateImageMetadata = async ({
  params
}: {
  params: { PostAddress: string }
}) => {
  const image = await getResourcePageData(params.PostAddress)
  const featuredImage = {
    url: image.data[0].attributes.FeaturedImage.data.attributes.formats.large
      .url,
    size: { width: 1200, height: 600 },
    alt: image.data[0].attributes.PostTitle,
    contentType: 'image/png'
  }

  return [featuredImage]
}

export default async function Image({
  params,
  id
}: {
  params: { PostAddress: string }
  id: number
}) {
  const data = await getResourcePageData(params.PostAddress)
  const text = data.data[0].attributes.PostTitle

  return new ImageResponse(
    (
      <div
        style={
          {
            // ...
          }
        }
      >
        {text}
      </div>
    )
  )
}
