const path = require('path')
// // import i18n from 'i18next'

// // const translate = {
// //   i18n: {
// //     defaultLocale: 'en',
// //     locales: ['en', 'fr'],
// //   },
// //   fallbackLng: {
// //     default: ['en'],
// //   },
// //   nonExplicitSupportedLngs: true,
// // }

// // export default translate

// i18n = {
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en', 'de'],
//   },
//   fallbackLng: {
//     default: ['en'],
//   },
//   nonExplicitSupportedLngs: true,
// }

// module.exports = i18n

module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
