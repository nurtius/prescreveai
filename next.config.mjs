/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Configuração otimizada para Netlify
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Remove server-side features para export estático
  experimental: {
    appDir: true,
  },
}

export default nextConfig
