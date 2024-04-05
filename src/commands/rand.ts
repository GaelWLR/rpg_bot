import { Message } from 'discord.js';
import { random, replace, trim } from 'lodash';

import i18next from '../plugins/i18next';

import { Command } from '../types';
import { itemStore } from '../stores';

export const rand: Command = {
  name: 'rand',

  description: 'Select a random entry',

  async execute(message: Message, args: string[]) {
    const respond = (response: string) => message.channel.send(`${message.author} ${response}`);

    const entries = args
      .join(' ')
      .split(',')
      .map((str) => replace(trim(str, ', _-'), /(, *)/, ', '))
      .join(', ')
      .split(/, /g);

    if (entries.length === 0) {
      await respond(i18next.t('rand_missing_entries'));

      return;
    }

    if (entries.length === 1) {
      if (itemStore.has(entries[0])) {
        entries.push(...(itemStore.get(entries[0]) || []));
        entries.shift();
      }
    }

    await respond(entries[random(0, entries.length - 1, false)]);

    return;
  },
};
