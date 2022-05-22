import { Message } from 'discord.js';

import i18next from '../plugins/i18next';
import diceService from '../services/dice';
import { Command } from '../types';

export const roll: Command = {
  name: 'roll',

  description: 'Roll one or more dice',

  async execute(message: Message, [arg]: string[], cheat: boolean): Promise<void> {
    await message.delete();
    const respond = (response: string) => message.channel.send(`${message.author} ${response}`);
    const respondWithCheat = (response: string) =>
      message.channel.send(`${message.author} ${response} ${i18next.t('and_he_cheated_the_villain')}`);

    if (!arg.match(diceService.regex)) {
      await respond(i18next.t('arg_syntax_error', { example: 'd4, 3d20+4, d12-2' }));

      return;
    }

    const [number, type, modifier] = arg
      .toLowerCase()
      .split(/d|(?=[+\-])/g)
      .map((value) => parseInt(value));

    if (!diceService.types.includes(type)) {
      await respond(i18next.t('dice_not_supported', { type }));

      return;
    }

    const modifierText = modifier ? (modifier > 0 ? `+${modifier}` : modifier) : '';

    if (number) {
      const { rolls, rollsTotal } = diceService.multipleRoll(type, number, modifier, cheat);
      const response = i18next.t('dice_roll', {
        count: number,
        modifierText,
        number,
        roll: rolls.join(', '),
        rollsTotal,
        type,
      });

      cheat ? await respondWithCheat(response) : await respond(response);

      return;
    }

    const roll = diceService.roll(type, modifier, cheat);
    const response = i18next.t('dice_roll', { count: 1, modifierText, roll, type });

    cheat ? await respondWithCheat(response) : await respond(response);

    return;
  },
};
