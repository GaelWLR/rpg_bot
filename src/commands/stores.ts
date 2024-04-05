import i18next from '../plugins/i18next';
import { Command } from '../types';
import { itemStore } from '../stores';

export const stores: Command = {
  name: 'stores',

  description: 'List store keys',

  async execute(message) {
    const respond = (response: string) => message.channel.send(`${message.author} ${response}`);

    const keys = Array.from(itemStore.keys()).join(', ');

    if (keys.length === 0) {
      await respond(i18next.t('stores_empty'));
    } else {
      await respond(i18next.t('stored_keys', { keys }));
    }
  },
};
