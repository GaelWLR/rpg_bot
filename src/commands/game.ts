import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { loadGames } from '../services/gameStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel, randomEntry } from '../utils/index.js';

export const game: Command = {
  name: 'game',

  description: {
    cs: 'Vybrat náhodnou hru',
    de: 'Zufälliges Spiel wählen',
    en: 'Choose a random game to play',
    es: 'Elegir un juego aleatorio',
    fr: 'Choisir un jeu aléatoire',
    it: 'Scegliere un gioco casuale',
    nl: 'Kies een willekeurig spel',
    pl: 'Wybrać losową grę',
    pt: 'Escolher um jogo aleatório',
    sv: 'Välj ett slumpmässigt spel',
  },

  example: '{PREFIX}game',

  async execute(message: Message): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    if (!message.guildId) {
      return;
    }

    const games = loadGames(message.guildId);

    if (!games.length) {
      await message.channel.send(i18n.t('game_empty'));

      return;
    }

    const game = randomEntry(games);

    await message.channel.send(`${message.author} ${i18n.t('game_drawn', { game })}`);
  },
};
