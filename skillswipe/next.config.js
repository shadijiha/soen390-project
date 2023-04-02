
const { i18n } = require('./next-i18next.config')
// /** @type {import('./next-i18next.config').i18n} */

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },


  env: {
    BASE_URL: process.env.BASE_URL,
  },
  i18n,
}

module.exports = nextConfig