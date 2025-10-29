import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel, randomEntry } from '../utils/index.js';

export const insult: Command = {
  name: 'insult',

  description: {
    cs: 'Urazit zmíněné uživatele náhodnou urážkou',
    de: 'Erwähnte Benutzer mit zufälliger Beleidigung beleidigen',
    en: 'Insult mentioned users with a random entry',
    es: 'Insultar a los usuarios mencionados con una entrada aleatoria',
    fr: 'Insulter les utilisateurs mentionnés avec une entrée aléatoire',
    it: 'Insultare gli utenti menzionati con una voce casuale',
    nl: 'Beledig vermelde gebruikers met een willekeurige belediging',
    pl: 'Obrazić wspomnianych użytkowników losową obelgą',
    pt: 'Insultar usuários mencionados com uma entrada aleatória',
    sv: 'Förolämpa nämnda användare med en slumpmässig förolämpning',
  },

  example: '{PREFIX}insult @user1 @user2',

  async execute(message: Message) {
    ensureSendableChannel(message);

    await message.delete();

    const mentionedUsers = message.mentions.users.map((user) => user.toString());

    const insultsKey = mentionedUsers.length > 1 ? 'insults_plural' : 'insults';
    const insults = i18n
      .t(insultsKey)
      .split(',')
      .filter((insult) => insult.trim());

    if (!insults.length) {
      await message.channel.send(i18n.t('insults_empty'));

      return;
    }

    await message.channel.send(`${mentionedUsers.join(' ')} ${randomEntry(insults)}`);
  },
};
