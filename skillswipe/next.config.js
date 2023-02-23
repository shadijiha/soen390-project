/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;