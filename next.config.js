/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    basePath: '/github-pages',
    images: {
        domains: ['res.cloudinary.com'],
    },
    // output: 'export',
}

module.exports = nextConfig
