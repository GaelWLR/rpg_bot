import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel, randomEntry } from '../utils/index.js';

export const rand: Command = {
  name: 'rand',

  description: {
    cs: 'Vybrat náhodnou položku',
    de: 'Zufälligen Eintrag auswählen',
    en: 'Select a random entry',
    es: 'Seleccionar una entrada aleatoria',
    fr: 'Sélectionner une entrée aléatoire',
    it: 'Selezionare una voce casuale',
    nl: 'Selecteer een willekeurige keuze',
    pl: 'Wybrać losowy wpis',
    pt: 'Selecionar uma entrada aleatória',
    sv: 'Välj en slumpmässig post',
  },

  example: '{PREFIX}rand choice1, choice2, choice3',

  async execute(message: Message, args: string[]) {
    ensureSendableChannel(message);

    await message.delete();

    const entries = args
      .join(' ')
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => entry);

    if (!entries.length) {
      await message.channel.send(i18n.t('rand_missing_entries'));

      return;
    }

    const responseMessage = i18n.t('rand_drawn', {
      entry: randomEntry(entries),
      entries: entries.join(', '),
    });

    await message.channel.send(`${message.author} ${responseMessage}`);
  },
};
