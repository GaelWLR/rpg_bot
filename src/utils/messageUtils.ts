import { Message } from 'discord.js';

/**
 * Check if the message channel is sendable and throw if not
 * Use this at the start of command handlers to fail fast
 */
export function ensureSendableChannel(message: Message): asserts message is Message & {
  channel: Extract<Message['channel'], { send: unknown }>;
} {
  if (!message.channel.isSendable()) {
    throw new Error('channel is not sendable');
  }
}
