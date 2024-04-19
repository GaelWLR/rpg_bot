import { Message } from 'discord.js';
import { replace, trim } from 'lodash';

import i18next from '../plugins/i18next';

import { Command } from '../types';
import { randomEntry } from '../utils';

export const rand: Command = {
  name: 'rand',

  description: 'Select a random entry',

  async execute(message: Message, args: string[]) {
    let responseMessage = i18next.t('a_problem_occurred');

    const entries = args
      .join(' ')
      .split(',')
      .map((str) => replace(trim(str, ', _-'), /(, *)/, ', '))
      .join(', ')
      .split(/, /g);

    if (!entries.length) {
      responseMessage = i18next.t('rand_missing_entries');
    } else {
      responseMessage = i18next.t('rand_drawn', { entry: randomEntry(entries), entries: entries.join(', ') });
    }

    await message.channel.send(`${message.author} ${responseMessage}`);
  },
};
