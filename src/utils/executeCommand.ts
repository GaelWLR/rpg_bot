import { Message } from 'discord.js';

import i18next from '../plugins/i18next';

import { Command } from '../types';

/**
 * Execute the given command and handle error
 */
export async function executeCommand(command: Command, args: string[], message: Message) {
  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);

    await message.channel.send(`${i18next.t('a_problem_occurred')}`);
  }
}
