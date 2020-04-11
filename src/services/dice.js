module.exports = {
  name: 'dice',
  description: 'Dice available',
  types: [4, 6, 8, 10, 12, 20, 100],

  /**
   * Roll a dice
   * @param {number} type
   */
  roll(type) {
    return Math.floor(Math.random() * (type - 1)) + 1
  },

  /**
   * Roll multiple dices
   * @param {number} type
   * @param {number} number
   */
  multipleRoll(type, number) {
    rolls = []
    for (let i = 0; i < number; i++) {
      rolls.push(this.roll(type))
    }

    return rolls
  },
}
