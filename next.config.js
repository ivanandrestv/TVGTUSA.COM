/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'redaccion.centraldenoticiasgt.com',
      'centraldenoticiasgt.com',
      'tvgtusa.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/rss.xml',
        destination: '/api/rss',
      },
    ]
  },
}

module.exports = nextConfig
