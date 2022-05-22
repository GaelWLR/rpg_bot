import { Message } from 'discord.js';

import diceService from '../services/dice';
import { roll } from './roll';
import { Command } from '../types';

export const cheat: Command = {
  name: 'cheat',

  description: 'Cheat on another command',

  execute(message: Message, [arg]: string[]) {
    if (arg.match(diceService.regex)) {
      roll.execute(message, [arg], true);
    }
  },
};
