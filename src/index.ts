import i18next from './plugins/i18next';

import Client from './Client';
import diceService from './services/dice';
import { roll } from './commands';
import { executeCommand, loadConfig } from './utils';
import { Events } from 'discord.js';

// Load config
const { prefix, token } = loadConfig();

// Create client
const client = new Client();

// Add listener to get command from server message
client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith(prefix)) {
    const [commandName, ...args] = message.content.slice(prefix.length).toLowerCase().split(/ +/);
    const command = client.commands.get(commandName);

    if (command) {
      await executeCommand(command, args, message);
    } else if (commandName.match(diceService.regex)) {
      await executeCommand(roll, [commandName], message);
    } else {
      await message.channel.send(`${i18next.t('command_not_supported')}`);
    }
  }
});

// Mount client
client.login(token);
