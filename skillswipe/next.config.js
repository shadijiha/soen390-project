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


  i18n: {
    locales: ['en', 'fr'], // Replace 'fr' with the language code of your second language
    defaultLocale: 'en',
  },

};

module.exports = nextConfig;
