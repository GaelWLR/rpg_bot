import { Message } from 'discord.js';

export type Command = {
  name: string;
  description: {
    en: string;
    fr: string;
  };
  example?: string;
  execute: (message: Message, args: string[]) => Promise<void>;
};
