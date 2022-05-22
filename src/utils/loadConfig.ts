import * as dotenv from 'dotenv';

dotenv.config();

export function loadConfig() {
  const prefix = process.env.PREFIX || '';
  const token = process.env.DISCORD_TOKEN || '';

  if (!token) {
    console.error('Missing env configuration.');
    process.exit(1);
  }

  return { prefix, token };
}
