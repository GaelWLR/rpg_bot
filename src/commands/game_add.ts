import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { addGame } from '../services/gameStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const game_add: Command = {
  name: 'game_add',

  description: {
    en: 'Add a game to the random game pool',
    fr: 'Ajouter un jeu à la liste des jeux aléatoires',
  },

  example: '{PREFIX}game_add Darktide',

  async execute(message: Message, args: string[]): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    if (!message.guildId) {
      return;
    }

    const gameName = args.join(' ').trim();

    if (!gameName) {
      await message.channel.send(`${message.author} ${i18n.t('game_add_missing_name')}`);

      return;
    }

    const added = addGame(message.guildId, gameName);

    if (added) {
      await message.channel.send(`${message.author} ${i18n.t('game_added', { game: gameName })}`);
    } else {
      await message.channel.send(`${message.author} ${i18n.t('game_already_exists', { game: gameName })}`);
    }
  },
};
