// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imgv2-1-f.scribdassets.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '**.imagekit.io',
                port: '',
                pathname: '/**',
            },
            // Add any other image hosts you'll use
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
                pathname: '/**',
            },
        ],
        // Alternatively, you can use the older 'domains' property (deprecated but still works)
        // domains: [
        //   'imgv2-1-f.scribdassets.com',
        //   'ik.imagekit.io',
        //   'images.unsplash.com',
        //   'via.placeholder.com',
        // ],
    },
    // Other Next.js configurations
    reactStrictMode: true,
    swcMinify: true,
}

export default nextConfig;
