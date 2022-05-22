import { Message } from 'discord.js';
import { random, replace, trim } from 'lodash';

import i18next from '../plugins/i18next';

import { Command } from '../types';

export const rand: Command = {
  name: 'rand',

  description: 'Select a random entry',

  async execute(message: Message, args: string[]) {
    const respond = (response: string) => message.channel.send(`${message.author} ${response}`);

    const entriesStr = args.map((str) => replace(trim(str, ', _-'), /(, *)/, ', ')).join(', ');
    const entries = entriesStr.split(/, /g);

    if (entries.length === 0) {
      await respond(i18next.t('rand_missing_entries'));

      return;
    }

    await respond(entries[random(0, entries.length - 1, false)]);

    return;
  },
};
