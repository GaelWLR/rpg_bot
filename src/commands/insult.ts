import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { randomEntry } from '../utils/index.js';

export const insult: Command = {
  name: 'insult',

  description: 'Insult mentioned users with a random entry',

  async execute(message: Message) {
    await message.delete();

    const mentionedUsers = message.mentions.users.map((user) => user.toString());

    const insultsKey = mentionedUsers.length > 1 ? 'insults_plural' : 'insults';
    const insults = i18n.t(insultsKey).split(',');

    await message.channel.send(`${mentionedUsers.join(' ')} ${randomEntry(insults)}`);
  },
};
