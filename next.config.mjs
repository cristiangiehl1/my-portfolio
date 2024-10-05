/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.devicon.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'files.svgcdn.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gsap.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'svgrepo.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
