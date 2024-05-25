/** @type {import('next').NextConfig} */
process.env.HOSTNAME = '0.0.0.0'
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_API_IMAGE_HOST]
  },
  output: 'standalone',
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ['modules', 'pages', 'components']
  },
  async redirects() {
    const urls = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/redirects`
    ).then(res => res.json())
    if (urls.data === null || urls.data.length === 0) {
      return []
    }
    return urls.data.map(x => ({
      source: x.attributes.origin_url,
      destination: x.attributes.target_url,
      permanent: true
    }))
  }
}

module.exports = nextConfig
