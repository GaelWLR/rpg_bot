import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const GAMES_DIR = join(process.cwd(), 'data', 'games');

/**
 * ensures the games directory exists
 */
function ensureGamesDirectory(): void {
  if (!existsSync(GAMES_DIR)) {
    mkdirSync(GAMES_DIR, { recursive: true });
  }
}

/**
 * get the file path for a guild's games list
 */
function getGuildFilePath(guildId: string): string {
  return join(GAMES_DIR, `${guildId}.json`);
}

/**
 * load games list for a guild
 */
export function loadGames(guildId: string): string[] {
  ensureGamesDirectory();

  const filePath = getGuildFilePath(guildId);

  if (!existsSync(filePath)) {
    return [];
  }

  try {
    const data = readFileSync(filePath, 'utf-8');
    const games = JSON.parse(data);

    return Array.isArray(games) ? games : [];
  } catch {
    return [];
  }
}

/**
 * save games list for a guild
 */
export function saveGames(guildId: string, games: string[]): void {
  ensureGamesDirectory();

  const filePath = getGuildFilePath(guildId);
  writeFileSync(filePath, JSON.stringify(games, null, 2), 'utf-8');
}

/**
 * add a game to the guild's list
 * returns true if added, false if already exists
 */
export function addGame(guildId: string, game: string): boolean {
  const games = loadGames(guildId);
  const trimmedGame = game.trim();

  if (games.includes(trimmedGame)) {
    return false;
  }

  games.push(trimmedGame);
  games.sort();
  saveGames(guildId, games);

  return true;
}

/**
 * remove a game from the guild's list
 * returns true if removed, false if not found
 */
export function removeGame(guildId: string, game: string): boolean {
  const games = loadGames(guildId);
  const trimmedGame = game.trim();
  const index = games.indexOf(trimmedGame);

  if (index === -1) {
    return false;
  }

  games.splice(index, 1);
  saveGames(guildId, games);

  return true;
}
