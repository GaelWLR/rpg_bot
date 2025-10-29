import { Message } from 'discord.js';

import Client from '../Client.js';
import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const commands: Command = {
  name: 'commands',

  description: {
    cs: 'Zobrazit všechny dostupné příkazy',
    de: 'Alle verfügbaren Befehle auflisten',
    en: 'List all available commands',
    es: 'Listar todos los comandos disponibles',
    fr: 'Lister toutes les commandes disponibles',
    it: 'Elencare tutti i comandi disponibili',
    nl: 'Lijst van alle beschikbare commando\'s',
    pl: 'Wyświetl wszystkie dostępne polecenia',
    pt: 'Listar todos os comandos disponíveis',
    sv: 'Lista alla tillgängliga kommandon',
  },

  example: '{PREFIX}commands',

  async execute(message: Message): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    const client = message.client as Client;
    const prefix = process.env.PREFIX ?? '';
    const lang = i18n.language as 'cs' | 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pl' | 'pt' | 'sv';
    const commandsList = Array.from(client.commands.values())
      .map((cmd) => {
        const description = cmd.description[lang] || cmd.description.en || cmd.description.fr;
        const example = cmd.example ? ` - \`${cmd.example.replace('{PREFIX}', prefix)}\`` : '';
        return `**${cmd.name}**: ${description}${example}`;
      })
      .sort()
      .join('\n');

    await message.channel.send(i18n.t('commands_list', { commands: commandsList }));
  },
};
