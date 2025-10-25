import { Message } from 'discord.js';
import replace from 'lodash/replace.js';
import trim from 'lodash/trim.js';

import { i18n } from '../plugins/index.js';
import { Command, isTextBasedChannel } from '../types/index.js';
import { randomEntry } from '../utils/index.js';

export const rand: Command = {
  name: 'rand',

  description: 'Select a random entry',

  async execute(message: Message, args: string[]) {
    let responseMessage = i18n.t('a_problem_occurred');

    const entries = args
      .join(' ')
      .split(',')
      .map((str) => replace(trim(str, ', _-'), /(, *)/, ', '))
      .join(', ')
      .split(/, /g);

    if (!entries.length) {
      responseMessage = i18n.t('rand_missing_entries');
    } else {
      responseMessage = i18n.t('rand_drawn', { entry: randomEntry(entries), entries: entries.join(', ') });
    }

    if (isTextBasedChannel(message.channel)) {
      await message.channel.send(`${message.author} ${responseMessage}`);
    }
  },
};
