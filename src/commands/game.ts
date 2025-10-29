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

    const games = (process.env.RAND_GAMES ?? '').split(',');

    let response = i18n.t('a_problem_occurred');

    if (!games.length) {
      response = i18n.t('game_empty');
    } else {
      const game = randomEntry(games);

      response = `${message.author} ${i18n.t('game_drawn', { game })}`;
    }

    await message.channel.send(response);
  },
};
