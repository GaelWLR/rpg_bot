import { random } from 'lodash';

export default {
  name: 'dice',

  description: 'Dice available',

  types: [4, 6, 8, 10, 12, 20, 100],

  regex: /^(\d*)?(d\d+)([+-]\d+)?$/g,

  parseDiceArg(arg: string) {
    const [number, type, modifier] = arg
      .toLowerCase()
      .split(/d|(?=[+-])/g)
      .map((value) => parseInt(value));

    return { number, type, modifier };
  },

  /**
   * Roll a dice
   */
  roll(type: number, modifier = 0, cheat = false) {
    const min = cheat ? Math.floor((type / 4) * 3) : 1;

    return random(min, type) + modifier;
  },

  /**
   * Roll multiple dices
   */
  multipleRoll(type: number, number: number, modifier = 0, cheat = false) {
    const rolls = [];

    for (let i = 0; i < number; i++) {
      rolls.push(this.roll(type, 0, cheat));
    }

    const rollsTotal = rolls.reduce((sum, roll) => sum + roll, 0) + modifier;

    return { rolls, rollsTotal };
  },
};
