const path = require('path');


module.exports = {
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'fr'],
   localePath: path.resolve ('./public/static/locales'),

    localeStructure: '{{lng}}/{{ns}}',

    localeSubpaths: {
      en: 'en',
      fr: 'fr',
    },
  },
  };

