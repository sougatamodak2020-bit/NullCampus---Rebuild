/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    // REMOVED: optimizeCss: true, ← This was causing the critters error
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/fiber', '@react-three/drei'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  async headers() {
    return [
      { 
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)', 
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] 
      },
      { 
        source: '/_next/static/:path*', 
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] 
      },
    ]
  },

  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig