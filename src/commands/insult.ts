import { Message } from 'discord.js';

import i18next from '../plugins/i18next';

import { Command } from '../types';
import { randomEntry } from '../utils';

export const insult: Command = {
  name: 'insult',

  description: 'Insult mentioned users with a random entry',

  async execute(message: Message) {
    await message.delete();

    const mentionedUsers = message.mentions.users.map((user) => user.toString());

    const insultsKey = mentionedUsers.length > 1 ? 'insults_plural' : 'insults';
    const insults = i18next.t(insultsKey).split(',');

    await message.channel.send(`${mentionedUsers.join(' ')} ${randomEntry(insults)}`);
  },
};
