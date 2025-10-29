import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { addGame } from '../services/gameStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const game_add: Command = {
  name: 'game_add',

  description: {
    cs: 'Přidat hru do seznamu',
    de: 'Spiel zur Liste hinzufügen',
    en: 'Add a game to the random game pool',
    es: 'Agregar un juego a la lista',
    fr: 'Ajouter un jeu à la liste des jeux aléatoires',
    it: 'Aggiungere un gioco alla lista',
    nl: 'Voeg een spel toe aan de lijst',
    pl: 'Dodać grę do listy',
    pt: 'Adicionar um jogo à lista',
    sv: 'Lägg till ett spel i listan',
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
