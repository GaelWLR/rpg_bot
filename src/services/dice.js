module.exports = {
  name: 'dice',
  description: 'Dice available',
  types: [4, 6, 8, 10, 12, 20, 100],
  regex: /^(\d*)?(d\d+)([+-]\d+)?$/g,

  /**
   * Roll a dice
   * @param {number} type
   * @param {number} [modifier=0]
   * @returns {number}
   */
  roll(type, modifier = 0) {
    return Math.max(Math.floor(Math.random() * (type - 1)) + 1 + modifier, 1)
  },

  /**
   * Roll multiple dices
   * @param {number} type
   * @param {number} number
   * @returns {{rolls: number[], rollsTotal: number}}
   */
  multipleRoll(type, number, modifier = 0) {
    rolls = []
    for (let i = 0; i < number; i++) {
      rolls.push(this.roll(type))
    }
    const rollsTotal = Math.max(
      rolls.reduce((previousValue, currentValue) => previousValue + currentValue, 0) + modifier,
      1
    )

    return { rolls, rollsTotal }
  },
}
