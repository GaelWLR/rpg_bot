import { Events } from 'discord.js';

import Client from './Client.js';

import { roll } from './commands/index.js';
import { i18n } from './plugins/index.js';
import diceService from './services/dice.js';
import { loadLanguage } from './services/languageStorage.js';
import { executeCommand, loadConfig } from './utils/index.js';

// Load config
const { prefix, token } = loadConfig();

// Create client
const client = new Client();

// Add listener to get command from server message
client.on(Events.MessageCreate, async (message) => {
  if (message.content.startsWith(prefix)) {
    if (message.guildId) {
      const guildLang = loadLanguage(message.guildId);

      await i18n.changeLanguage(guildLang);
    }

    const [commandName, ...args] = message.content.slice(prefix.length).toLowerCase().split(/ +/);
    const command = client.commands.get(commandName);

    if (command) {
      await executeCommand(command, args, message);
    } else if (commandName.match(diceService.regex)) {
      await executeCommand(roll, [commandName], message);
    } else {
      await message.channel.send(`${i18n.t('command_not_supported')}`);
    }
  }
});

// Mount client
client.login(token);
