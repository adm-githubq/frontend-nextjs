import { MeetingCard } from '@/components/MeetingCard'
import { getResources } from '@/core/resources'
import { AccordionSection } from '@/modules/HomePage/AccordionSection'
import { HomePageHeader } from '@/modules/HomePage/Header'
import { ServicesSection } from '@/modules/HomePage/ServicesSection'
import { TestimonialsSection } from '@/modules/HomePage/TestimonialsSection'
import { ToolsSection } from '@/modules/HomePage/ToolsSection'

const getHomePageData = async () => {
  const homePageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/home-page?populate=Tiles.TileImage,SecondSectionExpandable,BubblesWithWords,Testimonials,HeadingImage`,
    { next: { revalidate: 86400 } }
  )
  if (!homePageData.ok) {
    throw new Error('Failed to fetch home page data')
  }
  return homePageData.json()
}

const getResourcesData = async () => {
  const resourcesPageData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog-posts?populate=PostTitle,Thumbnail,ResourceLabel&sort=createdAt:desc`,
    { next: { revalidate: 86400 } }
  )
  if (!resourcesPageData.ok) {
    throw new Error('Failed to fetch resources page data')
  }
  return resourcesPageData.json()
}

const Home = async () => {
  const homePage = await getHomePageData()
  const resources = await getResourcesData()

  const headingProps = {
    HeaderTitle: homePage.data.attributes.HeaderTitle,
    headingDescription: homePage.data.attributes.headingDescription,
    headingButtonSecondary: homePage.data.attributes.headingButtonSecondary,
    headingButtonPrimary: homePage.data.attributes.headingButtonPrimary,
    headingImage:
      homePage.data.attributes.HeadingImage.data.attributes.url ||
      homePage.data.attributes.HeadingImage.data.attributes.formats.small.url
  }

  const toolsSectionProps = {
    title: homePage.data.attributes.ToolsSectionTitle,
    toolsList: homePage.data.attributes.BubblesWithWords,
    buttonText: homePage.data.attributes.ToolsButton
  }

  const servicesSectionProps = {
    title: homePage.data.attributes.ServicesTitle,
    description: homePage.data.attributes.ServicesDescription,
    tiles: homePage.data.attributes.Tiles
  }

  const TestimonialsSectionProps = {
    title: homePage.data.attributes.TestimonialsSectionTitle,
    testimonials: homePage.data.attributes.Testimonials
  }

  return (
    <main className='relative overflow-x-hidden  w-full flex flex-col '>
      <HomePageHeader headingData={headingProps} />
      <AccordionSection
        expandables={homePage.data.attributes.SecondSectionExpandable}
        sectionTitle={homePage.data.attributes.SecondSectionSectionTitle}
      />
      <ServicesSection
        title={servicesSectionProps.title}
        description={servicesSectionProps.description}
        tiles={servicesSectionProps.tiles}
      />
      <TestimonialsSection
        title={TestimonialsSectionProps.title}
        testimonials={TestimonialsSectionProps.testimonials}
      />
      <section className='w-full flex items-center justify-center py-24 px-4 md:px-24'>
        <MeetingCard calendly={true} buttonText='Meet Our Founders' />
      </section>
      <ToolsSection
        title={toolsSectionProps.title}
        toolsList={toolsSectionProps.toolsList}
        buttonText={toolsSectionProps.buttonText}
        resourcesList={getResources(resources.data)}
      />
    </main>
  )
}

export default Home
