/** @typedef {import('discord.js').Message} Message */
const diceService = require('../services/dice')
const roll = require('./roll')

module.exports = {
  name: 'cheat',
  description: 'Cheat on another command',

  /**
   * Command execution
   * @param {Message} message
   * @param {string} arg
   */
  execute(message, [arg]) {
    if (arg.match(diceService.regex)) {
      roll.execute(message, [arg], true)
    }
  },
}
