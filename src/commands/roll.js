/** @typedef {import('discord.js').Message} Message */
const i18n = require('../plugins/i18n')
const diceService = require('../services/dice')

module.exports = {
  name: 'roll',
  description: 'Roll one or more dice',

  /**
   * Command execution
   * @param {Message} message
   * @param {string} arg
   */
  execute(message, [arg]) {
    let response = ''

    if (arg.match(diceService.regex)) {
      const [number, type, modifier] = arg
        .toLowerCase()
        .split(/d|(?=\+|\-)/g)
        .map((value) => parseInt(value))

      if (diceService.types.includes(type)) {
        if (number) {
          const { rolls, rollsTotal } = diceService.multipleRoll(type, number, modifier)
          const roll = rolls.join(', ')

          if (modifier) {
            response = i18n.tn('dice_roll_with_modifier', number, { type, roll, rollsTotal, modifier })
          } else {
            response = i18n.tn('dice_roll', number, { type, roll, rollsTotal })
          }
        } else {
          const roll = diceService.roll(type, modifier)

          if (modifier) {
            response = i18n.tn('dice_roll_with_modifier', 1, { type, roll, modifier })
          } else {
            response = i18n.tn('dice_roll', 1, { type, roll })
          }
        }
      } else {
        response = i18n.t('dice_not_supported', { type })
      }
    } else {
      response = i18n.t('arg_syntax_error', { example: '3d20+4, d12-2' })
    }

    message.channel.send(`${message.author} ${response}`)
    message.delete()
  },
}
