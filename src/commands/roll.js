/** @typedef {import('discord.js').Message} Message */
const i18n = require('../plugins/i18n')
const diceService = require('../services/dice')

module.exports = {
  name: 'roll',
  description: 'Roll one or more dice',

  /**
   * Command execution
   * @param {Message} message
   * @param {Array} args
   */
  execute(message, args) {
    const [number, type] = args[0]
      .toLowerCase()
      .split('d')
      .map((value) => parseInt(value))

    if (diceService.types.includes(type)) {
      if (number && !isNaN(number)) {
        const rolls = diceService.multipleRoll(type, number)
        const roll = rolls.join(', ')
        const rollTotal = rolls.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

        message.channel.send(`${message.author} ${i18n.tn('dice_roll', number, { type, roll, rollTotal })}`)
      } else {
        const roll = diceService.roll(type)

        message.channel.send(`${message.author} ${i18n.tn('dice_roll', 1, { type, roll })}`)
      }
    } else {
      message.channel.send(`Dice ${type} not supported!`)
    }

    message.delete()
  },
}
