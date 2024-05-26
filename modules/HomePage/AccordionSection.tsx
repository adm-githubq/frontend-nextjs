import { Accordion, AccordionProps } from '@/components/Accordion'
import Image from 'next/image'
import HealingImage from '@/public/Healing-begins.png'

interface AccordionSectionProps extends AccordionProps {
  sectionTitle: string
}

export const AccordionSection: React.FC<AccordionSectionProps> = ({
  expandables,
  sectionTitle
}) => {
  return (
    <section
      id='accordion'
      className='w-full flex items-center justify-center md:py-24 md:px-24 py-12 px-4'
    >
      <div className='md:max-w-[1440px] w-full flex flex-wrap-reverse items-center md:items-start md:justify-center gap-8 md:gap-24'>
        <div className='px-4 py-4 md:py-0'>
          <Image
            src={HealingImage}
            alt='Healing Begins'
            width={466}
            height={466}
          />
        </div>
        <div className='w-full md:min-w-[300px] md:max-w-[564px]'>
          <h2 className='font-bold  text-2xl text-center md:text-left md:text-4xl leading-[48px] md:leading-[72px] max-w-[564px] mb-8'>
            {sectionTitle.split(',')[0]}
            {sectionTitle.split(',').length > 1 ? ',' : null}
            {<br />}
            {sectionTitle.split(',')[1]}
          </h2>
          <Accordion expandables={expandables} />
        </div>
      </div>
    </section>
  )
}
