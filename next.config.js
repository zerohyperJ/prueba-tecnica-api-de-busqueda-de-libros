/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 86400, // 24 horas
  },
  // Compresión gzip
  compress: true,
  // Remover header X-Powered-By
  poweredByHeader: false,
  // Modo estricto de React
  reactStrictMode: true,
  // Optimización de fuentes
  optimizeFonts: true,
  // Minificación de CSS
  swcMinify: true,
}

module.exports = nextConfig
