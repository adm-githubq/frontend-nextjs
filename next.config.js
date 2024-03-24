/** @type {import('next').NextConfig} */
process.env.HOSTNAME = '0.0.0.0'
const nextConfig = {
  images: {
    domains: [
      'cms.quantumadr.com',
      'quantumadr-production.s3.eu-central-1.amazonaws.com'
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
