import { Message } from 'discord.js';

import i18next from '../plugins/i18next';
import { Command } from '../types';
import { randomEntry } from '../utils';

export const game: Command = {
  name: 'game',

  description: 'Chose a random game to play',

  async execute(message: Message): Promise<void> {
    await message.delete();

    const games = (process.env.RAND_GAMES ?? '').split(',');

    let response = i18next.t('a_problem_occurred');

    if (!games.length) {
      response = i18next.t('game_empty');
    } else {
      const game = randomEntry(games);

      response = `${message.author} ${i18next.t('game_drawn', { game })}`;
    }

    await message.channel.send(response);
  },
};
