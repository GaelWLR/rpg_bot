import { Message } from 'discord.js';
import replace from 'lodash/replace.js';
import trim from 'lodash/trim.js';

import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel, randomEntry } from '../utils/index.js';

export const rand: Command = {
  name: 'rand',

  description: 'Select a random entry',

  async execute(message: Message, args: string[]) {
    ensureSendableChannel(message);

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

    await message.channel.send(`${message.author} ${responseMessage}`);
  },
};
