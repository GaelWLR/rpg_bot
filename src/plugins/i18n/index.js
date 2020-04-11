const i18n = require('i18n')

i18n.configure({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  queryParameter: 'lang',
  directory: './src/locales',
})

i18n.t = (...args) => i18n.__(...args)
i18n.tn = (...args) => i18n.__n(...args)

module.exports = i18n
