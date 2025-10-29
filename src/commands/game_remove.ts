import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { removeGame } from '../services/gameStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const game_remove: Command = {
  name: 'game_remove',

  description: {
    cs: 'Odebrat hru ze seznamu',
    de: 'Spiel aus der Liste entfernen',
    en: 'Remove a game from the random game pool',
    es: 'Eliminar un juego de la lista',
    fr: 'Retirer un jeu de la liste des jeux aléatoires',
    it: 'Rimuovere un gioco dalla lista',
    nl: 'Verwijder een spel van de lijst',
    pl: 'Usunąć grę z listy',
    pt: 'Remover um jogo da lista',
    sv: 'Ta bort ett spel från listan',
  },

  example: '{PREFIX}game_remove Darktide',

  async execute(message: Message, args: string[]): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    if (!message.guildId) {
      return;
    }

    const gameName = args.join(' ').trim();

    if (!gameName) {
      await message.channel.send(`${message.author} ${i18n.t('game_remove_missing_name')}`);

      return;
    }

    const removed = removeGame(message.guildId, gameName);

    if (removed) {
      await message.channel.send(`${message.author} ${i18n.t('game_removed', { game: gameName })}`);
    } else {
      await message.channel.send(`${message.author} ${i18n.t('game_not_found', { game: gameName })}`);
    }
  },
};
