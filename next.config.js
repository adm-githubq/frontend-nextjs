/** @type {import('next').NextConfig} */
process.env.HOSTNAME = '0.0.0.0'
const nextConfig = {
  images: {
    domains: [
      'loved-dinosaur-04d4cbbf22.media.strapiapp.com',
      process.env.API_HOST,
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
