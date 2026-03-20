/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rccepublicschool.in',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.imagekit.io',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            }
        ],
    },
    reactStrictMode: true,
    swcMinify: true,
}

// CHANGE THIS LINE:
module.exports = nextConfig;