import { Message } from 'discord.js';

import Client from '../Client.js';
import { i18n } from '../plugins/index.js';
import { Command } from '../types/index.js';
import { ensureSendableChannel } from '../utils/index.js';

export const commands: Command = {
  name: 'commands',

  description: 'List all available commands',

  example: '{PREFIX}commands',

  async execute(message: Message): Promise<void> {
    ensureSendableChannel(message);

    await message.delete();

    const client = message.client as Client;
    const prefix = process.env.PREFIX ?? '';
    const commandsList = Array.from(client.commands.values())
      .map((cmd) => {
        const example = cmd.example ? ` - \`${cmd.example.replace('{PREFIX}', prefix)}\`` : '';
        return `**${cmd.name}**: ${cmd.description}${example}`;
      })
      .sort()
      .join('\n');

    await message.channel.send(i18n.t('commands_list', { commands: commandsList }));
  },
};
