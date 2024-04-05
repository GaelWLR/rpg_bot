import { Message } from 'discord.js';

import i18next from '../plugins/i18next';
import { Command } from '../types';
import { itemStore } from '../stores';

export const store: Command = {
  name: 'store',

  description: 'Store entries for later use',

  async execute(message: Message, [key, rawEntries]: string[]) {
    const respond = (response: string) => message.channel.send(`${message.author} ${response}`);

    const entries = rawEntries.split(',');

    if (entries.length === 0) {
      await respond(i18next.t('rand_missing_entries'));

      return;
    }

    const stored = itemStore.get(key) || [];

    itemStore.set(key, stored.concat(entries));

    await respond(i18next.t('store_success', { key }));
  },
};
