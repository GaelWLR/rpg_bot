import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command, isTextBasedChannel } from '../types/index.js';
import { randomEntry } from '../utils/index.js';

export const insult: Command = {
  name: 'insult',

  description: 'Insult mentioned users with a random entry',

  async execute(message: Message) {
    await message.delete();

    if (!isTextBasedChannel(message.channel)) {
      return;
    }

    const mentionedUsers = message.mentions.users.map((user) => user.toString());

    if (mentionedUsers.length === 0) {
      await message.channel.send(i18n.t('insult_no_mention'));
      return;
    }

    const insultsKey = mentionedUsers.length > 1 ? 'insults_plural' : 'insults';
    const insults = i18n.t(insultsKey).split(',').map((insult) => insult.trim()).filter((insult) => insult.length > 0);

    if (insults.length === 0) {
      await message.channel.send(i18n.t('a_problem_occurred'));
      return;
    }

    await message.channel.send(`${mentionedUsers.join(' ')} ${randomEntry(insults)}`);
  },
};
