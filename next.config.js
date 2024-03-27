/** @type {import('next').NextConfig} */
process.env.HOSTNAME = '0.0.0.0'
const nextConfig = {
  images: {
    domains: [
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
