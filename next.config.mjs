import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'http', hostname: 'marc-eg.com' },
      { protocol: 'https', hostname: 'marc-eg.com' },
    ],
  },
}

export default withNextIntl(nextConfig)
