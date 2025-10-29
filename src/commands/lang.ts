import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { loadLanguage, saveLanguage } from '../services/languageStorage.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

const SUPPORTED_LANGUAGES = ['cs', 'de', 'en', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sv'] as const;

type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

export const lang: Command = {
  name: 'lang',

  description: {
    cs: 'Nastavit jazyk bota pro tento server (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    de: 'Sprache des Bots für diesen Server festlegen (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    en: 'Set the bot language for this server (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    es: 'Establecer el idioma del bot para este servidor (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    fr: 'Définir la langue du bot pour ce serveur (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    it: 'Imposta la lingua del bot per questo server (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    nl: 'Stel de bottaal in voor deze server (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    pl: 'Ustaw język bota dla tego serwera (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    pt: 'Definir o idioma do bot para este servidor (cs/de/en/es/fr/it/nl/pl/pt/sv)',
    sv: 'Ställ in botens språk för denna server (cs/de/en/es/fr/it/nl/pl/pt/sv)',
  },

  example: '{PREFIX}lang en',

  async execute(message: Message, args: string[]): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    if (!message.guildId) {
      return;
    }

    const inputLang = args[0]?.toLowerCase().trim();

    if (!inputLang) {
      const currentLang = loadLanguage(message.guildId);

      await message.channel.send(`${message.author} ${i18n.t('language_current', { language: currentLang })}`);

      return;
    }

    if (!isSupportedLanguage(inputLang)) {
      await message.channel.send(`${message.author} ${i18n.t('language_invalid')}`);

      return;
    }

    saveLanguage(message.guildId, inputLang);
    await i18n.changeLanguage(inputLang);

    await message.channel.send(`${message.author} ${i18n.t('language_set', { language: inputLang })}`);
  },
};
