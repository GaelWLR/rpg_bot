import { Message } from 'discord.js';

export type Command = {
  name: string;
  description: {
    cs?: string;
    de?: string;
    en: string;
    es?: string;
    fr: string;
    it?: string;
    nl?: string;
    pl?: string;
    pt?: string;
    sv?: string;
  };
  example?: string;
  execute: (message: Message, args: string[]) => Promise<void>;
};
