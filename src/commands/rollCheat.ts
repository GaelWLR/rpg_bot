import { i18n } from '../plugins/index.js';
import diceService from '../services/dice.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const rollCheat: Command = {
  name: 'cheat',

  description: 'Cheat on another command',

  async execute(message, [arg]) {
    ensureSendableChannel(message);

    await message.delete();

    if (!arg || !arg.match(diceService.regex)) {
      await message.channel.send(`${i18n.t('arg_syntax_error', { example: 'd4, 3d20+4, d12-2' })}`);

      return;
    }

    const { number, type, modifier } = diceService.parseDiceArg(arg);

    if (!diceService.types.includes(type)) {
      await message.channel.send(`${i18n.t('dice_not_supported', { type })}`);

      return;
    }

    const modifierText = modifier ? (modifier > 0 ? `+${modifier}` : modifier) : '';

    const rollData = number
      ? { ...diceService.multipleRoll(type, number, modifier, true), count: number, number }
      : { roll: diceService.roll(type, modifier, true), count: 1 };

    const response = i18n.t('dice_roll', {
      ...rollData,
      modifierText,
      type,
    });

    await message.channel.send(`${message.author} ${response} ${i18n.t('and_he_cheated_the_villain')}`);
  },
};
