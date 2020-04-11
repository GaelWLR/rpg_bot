module.exports = {
  name: 'roll',
  description: 'Dice roll',
  execute(message, args) {
    const diceTypes = [4, 6, 8, 10, 12, 20, 100]
    const [diceType, number] = args.map((value) => parseInt(value))

    if (diceTypes.includes(diceType)) {
      if (number && !isNaN(number)) {
        const rolls = []
        for (let i = 0; i < number; i++) {
          rolls.push(this.getDiceRoll(diceType))
        }

        message.channel.send(`It's a roll of ${number} d${diceType}, get ${rolls.join(', ')}`)
      } else {
        const roll = this.getDiceRoll(diceType)

        message.channel.send(`It's a roll of d${diceType}, get ${roll}`)
      }
    } else {
      message.channel.send('Dice type not supported')
    }
  },
  getDiceRoll(type) {
    return Math.floor(Math.random() * (type - 1)) + 1
  },
}
