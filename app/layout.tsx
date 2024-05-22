import './globals.css'
import DesktopMenu from '@/components/DesktopMenu'
import Footer from '@/components/Footer'
import MobileMenu from '@/components/MobileMenu'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Partytown } from '@builder.io/partytown/react'
import { Rethink_Sans } from 'next/font/google'

const rethink_sans = Rethink_Sans({
  display: 'swap',
  style: 'normal',
  subsets: ['latin']
})

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

export async function generateMetadata() {
  // Setting default metadata for the entire site, but can be overridden by individual pages.
  const title = 'Quantum ADR'
  const description =
    'Reshaping divorce and coparenting outcomes with conscious uncoupling'

  return {
    title,
    description
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        {GA_ID ? (
          <meta
            name='google-site-verification'
            content='TvkzPehNPl8bgENLuXZdpg5oAbt1P2Zai0mO2-wTs60'
          />
        ) : null}

        <Partytown forward={['dataLayer.push']} />
        <script
          type='text/partytown'
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        ></script>
        <script
          type='text/partytown'
          dangerouslySetInnerHTML={{
            __html: `
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${GA_ID}');
    `
          }}
        />
      </head>
      <body
        className={[
          'flex flex-col min-h-screen overflow-x-hidden',
          rethink_sans.className
        ].join(', ')}
      >
        <DesktopMenu />
        <MobileMenu />
        {/*
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
        */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
