import './globals.css'
import DesktopMenu from '@/components/DesktopMenu'
import Footer from '@/components/Footer'
import MobileMenu from '@/components/MobileMenu'
import { GoogleAnalytics } from '@next/third-parties/google'

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
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        {GA_ID ? (
          <meta
            name='google-site-verification'
            content='TvkzPehNPl8bgENLuXZdpg5oAbt1P2Zai0mO2-wTs60'
          />
        ) : null}
      </head>
      <body className='flex flex-col min-h-screen overflow-x-hidden'>
        <DesktopMenu />
        <MobileMenu />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
        {children}
        <Footer />
      </body>
    </html>
  )
}
