import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { loadLanguage, saveLanguage } from '../services/languageStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const lang: Command = {
  name: 'lang',

  description: {
    en: 'Set the bot language for this server (en/fr)',
    fr: 'Définir la langue du bot pour ce serveur (en/fr)',
  },

  example: '{PREFIX}lang en',

  async execute(message: Message, args: string[]): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    if (!message.guildId) {
      return;
    }

    const lang = args[0]?.toLowerCase().trim();

    if (!lang) {
      const currentLang = loadLanguage(message.guildId);

      await message.channel.send(`${message.author} ${i18n.t('language_current', { language: currentLang })}`);

      return;
    }

    if (lang !== 'en' && lang !== 'fr') {
      await message.channel.send(`${message.author} ${i18n.t('language_invalid')}`);

      return;
    }

    saveLanguage(message.guildId, lang);
    await i18n.changeLanguage(lang);

    await message.channel.send(`${message.author} ${i18n.t('language_set', { language: lang })}`);
  },
};
