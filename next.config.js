/** @type {import('next').NextConfig} */
process.env.HOSTNAME = '0.0.0.0'
const nextConfig = {
  images: {
    domains: [
      process.env.NEXT_PUBLIC_API_IMAGE_HOST,
    ]
  },
  output: 'standalone',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['modules', 'pages', 'components']
  }
}

module.exports = nextConfig
