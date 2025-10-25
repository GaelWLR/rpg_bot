import { Message } from 'discord.js';

import { i18n } from '../plugins/index.js';
import { Command, isTextBasedChannel } from '../types/index.js';

/**
 * Execute the given command and handle error
 */
export async function executeCommand(command: Command, args: string[], message: Message) {
  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);

    if (isTextBasedChannel(message.channel)) {
      await message.channel.send(`${i18n.t('a_problem_occurred')}`);
    }
  }
}
