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
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localePath: path.resolve('./public/locales'),
  },
}
