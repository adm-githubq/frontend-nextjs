import { format } from 'date-fns/format'

export interface Resource {
  id: string
  title: string
  content?: any
  img?: string
  thumbnail?: string
  categories?: string[]
  author?: string
  publishedAt?: string
  PostAddress?: string
  PublishedBy?: string
  ResourceType?: string
  ResourceLabelColor?: string
}

export interface ResourceCategory {
  id: string
  name?: string
}

export const getResourcesCategories = (data: any) => {
  return data.map((item: any) => {
    return {
      id: item.id,
      name: item.attributes.name ?? ''
    }
  })
}

export const getSingleResource = (
  data: any,
  withContent?: { fullContent: boolean }
): Resource => {
  const modifiedResource = withContent?.fullContent
    ? {
        id: data.id,
        title: data.attributes.PostTitle ?? '',
        content: data.attributes.PostContentEditor ?? null,
        img:
          data.attributes.FeaturedImage && data.attributes.FeaturedImage.data
            ? data.attributes.FeaturedImage.data.attributes.url
            : null,
        thumbnail:
          data.attributes.Thumbnail && data.attributes.Thumbnail.data
            ? data.attributes.Thumbnail.data.attributes.url
            : null,
        categories:
          data.attributes.categories && data.attributes.categories.data
            ? getResourcesCategories(data.attributes.categories.data)
            : [],
        PublishedBy: data.attributes.PublishedBy ?? 'Quantum ADR',
        publishedAt: data.attributes.publishedAt
          ? format(new Date(data.attributes.publishedAt), 'MM/dd/yyyy')
          : 'Unknown',
        PostAddress: data.attributes.PostAddress ?? '',
        ResourceType:
          data.attributes.ResourceLabel &&
          data.attributes.ResourceLabel.data.attributes.ResourceType
            ? data.attributes.ResourceLabel.data.attributes.ResourceType
            : null,
        ResourceLabelColor:
          data.attributes.ResourceLabel &&
          data.attributes.ResourceLabel.data.attributes.ResourceLabelColor
            ? data.attributes.ResourceLabel.data.attributes.ResourceLabelColor
            : null
      }
    : {
        id: data.id,
        title: data.attributes.PostTitle ?? '',
        thumbnail:
          data.attributes.Thumbnail && data.attributes.Thumbnail.data
            ? data.attributes.Thumbnail.data.attributes.url
            : null,
        PostAddress: data.attributes.PostAddress ?? '',
        ResourceType:
          data.attributes.ResourceLabel &&
          data.attributes.ResourceLabel.data.attributes.ResourceType
            ? data.attributes.ResourceLabel.data.attributes.ResourceType
            : null,
        ResourceLabelColor:
          data.attributes.ResourceLabel &&
          data.attributes.ResourceLabel.data.attributes.ResourceLabelColor
            ? data.attributes.ResourceLabel.data.attributes.ResourceLabelColor
            : null
      }

  return modifiedResource
}

export const getResources = (
  data: any,
  withContent?: { fullContent: boolean }
): Resource[] => {
  return data.map((item: any) => getSingleResource(item, withContent))
}
