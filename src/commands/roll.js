/** @typedef {import('discord.js').Message} Message */
const i18n = require('../plugins/i18n')

module.exports = {
  name: 'roll',
  description: 'Dice roll',
  /**
   * Command execution
   * @param {Message} message
   * @param {Array} args
   */
  execute(message, args) {
    const diceTypes = [4, 6, 8, 10, 12, 20, 100]
    const [number, diceType] = args[0]
      .toLowerCase()
      .split('d')
      .map((value) => parseInt(value))

    if (diceTypes.includes(diceType)) {
      if (number && !isNaN(number)) {
        const rolls = []
        for (let i = 0; i < number; i++) {
          rolls.push(this.getDiceRoll(diceType))
        }
        const roll = rolls.join(', ')
        const rollTotal = rolls.reduce((previousValue, currentValue) => previousValue + currentValue, 0)

        message.channel.send(`${message.author} ${i18n.tn('dice_roll', number, { diceType, roll, rollTotal })}`)
      } else {
        const roll = this.getDiceRoll(diceType)

        message.channel.send(`${message.author} ${i18n.tn('dice_roll', 1, { diceType, roll })}`)
      }
    } else {
      message.channel.send(`Dice ${diceType} not supported!`)
    }

    message.delete()
  },
  /**
   * Get a roll of a dice by is type
   * @param {number} type
   */
  getDiceRoll(type) {
    return Math.floor(Math.random() * (type - 1)) + 1
  },
}
