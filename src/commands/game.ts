import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel, randomEntry } from '../utils/index.js';

export const game: Command = {
  name: 'game',

  description: 'Chose a random game to play',

  async execute(message: Message): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    const games = (process.env.RAND_GAMES ?? '')
      .split(',')
      .map((game) => game.trim())
      .filter((game) => game);

    if (!games.length) {
      await message.channel.send(i18n.t('game_empty'));

      return;
    }

    const game = randomEntry(games);

    await message.channel.send(`${message.author} ${i18n.t('game_drawn', { game })}`);
  },
};
