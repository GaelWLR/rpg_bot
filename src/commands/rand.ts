import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command, isTextBasedChannel } from '../types/index.js';
import { randomEntry } from '../utils/index.js';

export const rand: Command = {
  name: 'rand',

  description: 'Select a random entry',

  async execute(message: Message, args: string[]) {
    if (!isTextBasedChannel(message.channel)) {
      return;
    }

    let responseMessage = i18n.t('a_problem_occurred');

    const entries = args
      .join(' ')
      .split(',')
      .map((str) => str.trim())
      .filter((str) => str.length > 0);

    if (entries.length === 0) {
      responseMessage = i18n.t('rand_missing_entries');
    } else {
      responseMessage = i18n.t('rand_drawn', { entry: randomEntry(entries), entries: entries.join(', ') });
    }

    await message.channel.send(`${message.author} ${responseMessage}`);
  },
};
