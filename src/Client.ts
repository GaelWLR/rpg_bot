import {Client as DiscordClient, Collection} from 'discord.js';

import { Command } from './types';
import * as commands from './commands';

export default class Client extends DiscordClient {
  public commands: Collection<string, Command>;

  constructor() {
    super();

    this.commands = new Collection();

    for (const command of Object.values(commands)) {
      this.commands.set(command.name, command);
    }
  }
}
