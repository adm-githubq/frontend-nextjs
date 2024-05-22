import { StaticImport } from 'next/dist/shared/lib/get-img-props'

export interface BulletPoint {
  id: string
  content: string
}

export interface Service {
  id: string
  heading?: string
  subheading?: string
  bulletPointsSectionTitle?: string
  bulletPoints?: BulletPoint[]
  headingImage?: string | StaticImport
  otherServicesSectionTitle?: string
}

export interface OtherService {
  id: string
  TileDescription?: string
  TileImage?: {
    data: {
      attributes: {
        url: string
      }
    }
  }
  Service?: {
    data: {
      attributes: {
        slug: string
      }
    }
  }
}

export const getService = (data: any): Service => {
  const modifiedData = {
    id: data.id,
    heading: data.attributes.Heading ?? '',
    subheading: data.attributes.HeadingBodyCopy ?? '',
    bulletPointsSectionTitle: data.attributes.BulletPointsSectionTitle ?? '',
    bulletPoints: data.attributes.BulletPoints ?? [],
    headingImage:
      data.attributes.HeadingImage && data.attributes.HeadingImage.data
        ? data.attributes.HeadingImage.data.attributes.formats
          ? data.attributes.HeadingImage.data.attributes.formats.large.url
          : data.attributes.HeadingImage.data.attributes.url
        : null,
    otherServicesSectionTitle: data.attributes.OtherServicesSectionTitle ?? ''
  }
  return modifiedData
}

export const SERVICES = {
  coparenting: 'co-parenting',
  coaching: 'coaching',
  divorce: 'divorce',
  mediation: 'mediation'
}

export const getOtherServices = (
  OtherServices: OtherService[]
): OtherService[] => {
  return OtherServices.map(service => {
    let link
    switch (service.TileDescription) {
      case 'Synchronous CoParenting':
        link = `/services/${SERVICES.coparenting}`
        break
      case 'Divorce + Separation Coaching':
        link = `/services/${SERVICES.divorce}`
        break
      case '360°  Mediation':
        link = `/services/${SERVICES.mediation}`
        break
      case 'Coaching for Professionals':
        link = `/services/${SERVICES.coaching}`
        break
      default:
        link = `/services/${SERVICES.coparenting}`
    }
    return {
      ...service,
      link
    }
  })
}
