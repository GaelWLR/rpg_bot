import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import diceService from '../services/dice.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const roll: Command = {
  name: 'roll',

  description: {
    cs: 'Hodit jednu nebo více kostek',
    de: 'Einen oder mehrere Würfel werfen',
    en: 'Roll one or more dice',
    es: 'Lanzar uno o más dados',
    fr: 'Lancer un ou plusieurs dés',
    it: 'Lanciare uno o più dadi',
    nl: 'Gooi één of meerdere dobbelstenen',
    pl: 'Rzucić jedną lub więcej kości',
    pt: 'Lançar um ou mais dados',
    sv: 'Kasta en eller flera tärningar',
  },

  example: '{PREFIX}roll 2d6+3',

  async execute(message: Message, [arg]: string[]): Promise<void> {
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
      ? { ...diceService.multipleRoll(type, number, modifier), count: number, number }
      : { roll: diceService.roll(type, modifier), count: 1 };

    const response = i18n.t('dice_roll', {
      ...rollData,
      modifierText,
      type,
    });

    await message.channel.send(`${message.author} ${response}`);
  },
};
