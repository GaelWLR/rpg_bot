/** @typedef {import('discord.js').Message} Message */
const i18n = require('../plugins/i18n')
const { random, trim, replace } = require('lodash')

module.exports = {
  name: 'rand',
  description: 'Select a random entry',

  /**
   * Command execution
   * @param {Message} message
   * @param {string[]} args
   */
  execute(message, args) {
    let response = ''

    const entriesStr = args.map(str => replace(trim(str, ', _-'), /(, *)/, ', ')).join(', ')
    const entries = entriesStr.split(/, /g)

    if (entries.length > 0) {
      response = `(${entriesStr}) => ${entries[random(0, entries.length - 1, false)]}`
    } else {
      response = i18n.t('rand_missing_entries')
    }

    message.channel.send(`${message.author} ${response}`)
    message.delete()
  },
}
