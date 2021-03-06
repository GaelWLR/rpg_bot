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
   * @param {boolean} cheat
   */
  execute(message, [arg], cheat) {
    let response = ''

    if (arg.match(diceService.regex)) {
      const [number, type, modifier] = arg
        .toLowerCase()
        .split(/d|(?=\+|\-)/g)
        .map((value) => parseInt(value))

      if (diceService.types.includes(type)) {
        const modifierText = modifier ? (modifier > 0 ? `+${modifier}` : modifier) : ''

        if (number) {
          const { rolls, rollsTotal } = diceService.multipleRoll(type, number, modifier, cheat)
          const roll = rolls.join(', ')

          response = i18n.tn('dice_roll', number, { type, roll, rollsTotal, modifierText })
        } else {
          const roll = diceService.roll(type, modifier, cheat)

          response = i18n.tn('dice_roll', 1, { type, roll, modifierText })
        }
      } else {
        response = i18n.t('dice_not_supported', { type })
      }
    } else {
      response = i18n.t('arg_syntax_error', { example: 'd4, 3d20+4, d12-2' })
    }

    if (cheat) {
      response += ' ' + i18n.t('and_he_cheated_the_villain')
    }

    message.channel.send(`${message.author} ${response}`)
    message.delete()
  },
}
