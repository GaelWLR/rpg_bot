import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import diceService from '../services/dice.js';
import { Command, isTextBasedChannel } from '../types/index.js';

export const roll: Command = {
  name: 'roll',

  description: 'Roll one or more dice',

  async execute(message: Message, [arg]: string[]): Promise<void> {
    await message.delete();

    if (!isTextBasedChannel(message.channel)) {
      return;
    }

    const channel = message.channel;
    const respond = (response: string) => channel.send(`${message.author} ${response}`);

    if (!arg.match(diceService.regex)) {
      await channel.send(`${i18n.t('arg_syntax_error', { example: 'd4, 3d20+4, d12-2' })}`);

      return;
    }

    const { number, type, modifier } = diceService.parseDiceArg(arg);

    if (!diceService.types.includes(type)) {
      await channel.send(`${i18n.t('dice_not_supported', { type })}`);

      return;
    }

    const modifierText = modifier ? (modifier > 0 ? `+${modifier}` : modifier) : '';

    if (number) {
      const { rolls, rollsTotal } = diceService.multipleRoll(type, number, modifier);
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
      const roll = diceService.roll(type, modifier);
      const response: string = i18n.t('dice_roll', { count: 1, modifierText, roll, type });

      await respond(response);
    }
  },
};
