import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { loadGames } from '../services/gameStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const game_list: Command = {
  name: 'game_list',

  description: {
    cs: 'Zobrazit všechny dostupné hry',
    de: 'Alle verfügbaren Spiele auflisten',
    en: 'List all available games in the pool',
    es: 'Listar todos los juegos disponibles',
    fr: 'Lister tous les jeux disponibles',
    it: 'Elencare tutti i giochi disponibili',
    nl: 'Lijst van alle beschikbare spellen',
    pl: 'Wyświetl wszystkie dostępne gry',
    pt: 'Listar todos os jogos disponíveis',
    sv: 'Lista alla tillgängliga spel',
  },

  example: '{PREFIX}game_list',

  async execute(message: Message): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    if (!message.guildId) {
      return;
    }

    const games = loadGames(message.guildId);

    if (!games.length) {
      await message.channel.send(`${message.author} ${i18n.t('game_empty')}`);

      return;
    }

    const gamesList = games.map((game) => `• ${game}`).join('\n');

    await message.channel.send(
      `${message.author} ${i18n.t('game_list', { count: games.length })}\n${gamesList}`,
    );
  },
};
