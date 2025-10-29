import { Message } from 'discord.js';

import Client from '../Client.js';
import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const commands: Command = {
  name: 'commands',

  description: {
    en: 'List all available commands',
    fr: 'Lister toutes les commandes disponibles',
  },

  example: '{PREFIX}commands',

  async execute(message: Message): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    const client = message.client as Client;
    const prefix = process.env.PREFIX ?? '';
    const lang = i18n.language as 'en' | 'fr';
    const commandsList = Array.from(client.commands.values())
      .map((cmd) => {
        const description = cmd.description[lang] || cmd.description.en;
        const example = cmd.example ? ` - \`${cmd.example.replace('{PREFIX}', prefix)}\`` : '';
        return `**${cmd.name}**: ${description}${example}`;
      })
      .sort()
      .join('\n');

    await message.channel.send(i18n.t('commands_list', { commands: commandsList }));
  },
};
