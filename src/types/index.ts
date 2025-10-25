export { Command } from './Command.js';

/**
 * Type guard to check if a channel has a send method
 */
export function isTextBasedChannel(channel: any): channel is { send: (content: string) => Promise<any> } {
  return channel && 'send' in channel && typeof channel.send === 'function';
}
