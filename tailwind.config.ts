import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rethink Sans', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(180deg, #0D9BFC 0%, rgba(139, 193, 230, 0.38) 98.93%, rgba(217, 217, 217, 0.00) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'service-heading': 'url("/Service-background.svg")'
      },
      backgroundPosition: {
        'bottom-4': 'center -20rem'
      },
      animation: {
        'spin-slow': 'spin 23s linear infinite'
      },
      colors: {
        primary: '#0D9BFC',
        primaryLight: '#E7F5FF',
        secondary: '#ADF2D1'
      },
      boxShadow: {
        'expandable-shadow': '0px 4px 60px 0px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
}
export default config
