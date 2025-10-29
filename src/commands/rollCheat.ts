import { i18n } from '../plugins/index.js';
import diceService from '../services/dice.js';
import { Command } from '../types/index.js';

export const rollCheat: Command = {
  name: 'cheat',

  description: 'Cheat on another command',

  async execute(message, [arg]) {
    await message.delete();

    const respond = async (response: string) => {
      if (message.channel.isSendable()) {
        await message.channel.send(`${message.author} ${response} ${i18n.t('and_he_cheated_the_villain')}`);
      }
    };

    if (!arg.match(diceService.regex)) {
      if (message.channel.isSendable()) {
        await message.channel.send(`${i18n.t('arg_syntax_error', { example: 'd4, 3d20+4, d12-2' })}`);
      }

      return;
    }

    const { number, type, modifier } = diceService.parseDiceArg(arg);

    if (!diceService.types.includes(type)) {
      if (message.channel.isSendable()) {
        await message.channel.send(`${i18n.t('dice_not_supported', { type })}`);
      }

      return;
    }

    const modifierText = modifier ? (modifier > 0 ? `+${modifier}` : modifier) : '';

    if (number) {
      const { rolls, rollsTotal } = diceService.multipleRoll(type, number, modifier, true);
      const response: string = i18n.t('dice_roll', {
        count: number,
        modifierText,
        number,
        roll: rolls.join(', '),
        rollsTotal,
        type,
      });

      await respond(response);
    } else {
      const roll = diceService.roll(type, modifier, true);
      const response: string = i18n.t('dice_roll', { count: 1, modifierText, roll, type });

      await respond(response);
    }
  },
};
