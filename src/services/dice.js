module.exports = {
  name: 'dice',
  description: 'Dice available',
  types: [4, 6, 8, 10, 12, 20, 100],
  regex: /^(\d*)?(d\d+)([+-]\d+)?$/g,

  /**
   * Roll a dice
   * @param {number} type
   * @param {number} [modifier=0]
   * @param {boolean} [cheat=false]
   * @returns {number}
   */
  roll(type, modifier = 0, cheat = false) {
    const min = cheat ? Math.floor((type / 4) * 3) : 1

    return Math.floor(Math.random() * (type - min + 1)) + min + modifier
  },

  /**
   * Roll multiple dices
   * @param {number} type
   * @param {number} number
   * @param {boolean} [cheat=false]
   * @returns {{rolls: number[], rollsTotal: number}}
   */
  multipleRoll(type, number, modifier = 0, cheat = false) {
    rolls = []

    for (let i = 0; i < number; i++) {
      rolls.push(this.roll(type, 0, cheat))
    }

    const rollsTotal = Math.max(
      rolls.reduce((previousValue, currentValue) => previousValue + currentValue, 0) + modifier,
      1
    )

    return { rolls, rollsTotal }
  },
}
