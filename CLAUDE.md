# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
yarn install

# Development with hot reload
yarn dev

# Build TypeScript to JavaScript
yarn build

# Run compiled code
yarn start

# Code quality
yarn lint      # Check linting issues
yarn format    # Format code with Prettier
```

## Architecture Overview

This is a **prefix-based Discord bot** (not slash commands) built with TypeScript and Discord.js v14. The bot uses an event-driven architecture with a custom Client extension.

### Bot Initialization Flow

1. **Entry point** (`src/index.ts`): Loads environment config, creates Client instance, registers MessageCreate listener, logs into Discord
2. **Custom Client** (`src/Client.ts`): Extends Discord.js Client with command Collection and auto-loading functionality
3. **Required Intents**: `GuildMessages`, `Guilds`, `MessageContent` (configured in Client.ts)

### Command System Architecture

**Auto-loading**: All commands are automatically loaded from `src/commands/index.ts` barrel exports into a Collection (Map-like structure) keyed by command name.

**Command Interface** (`src/types/Command.ts`):
```typescript
{
  name: string;
  description: {
    en: string;
    fr: string;
  };
  example?: string;  // Optional usage example (supports {PREFIX} placeholder)
  execute: (message: Message, args: string[]) => Promise<void>;
}
```

**Message Handling Flow**:
1. Listen for messages starting with PREFIX (from env)
2. Parse command name and arguments
3. Look up command in Collection or check for dice notation pattern
4. Execute via `executeCommand` wrapper (handles errors with i18n messages)
5. Delete user's command message for clean chat

**Special Case**: Dice notation (e.g., `2d6+3`) can be used directly without the `roll` command.

### Creating New Commands

1. Create file in `src/commands/` implementing Command interface
2. Add export to `src/commands/index.ts` barrel
3. Command is automatically loaded on bot startup
4. Use i18n for user-facing strings: `i18next.t('key')`
5. Handle errors gracefully - they're caught by executeCommand wrapper

## Services

### Dice Service

Located in `src/services/dice.ts`. Provides stateless dice rolling functionality.

**Dice Notation Regex**: `/^(\d*)?(d\d+)([+-]\d+)?$/g`
- Captures: quantity (optional), die type (d4-d100), modifier (optional)
- Supports multiple dice in single command: `roll 2d6+3 1d20-1`

**Cheat Mode**: Weighted rolls with minimum 75% of max possible value.

### Game Storage Service

Located in `src/services/gameStorage.ts`. Provides guild-specific persistent file storage for game lists.

**Storage Details**:
- **Location**: `data/games/{guildId}.json` (git-ignored)
- **Format**: JSON array of game names, automatically sorted alphabetically
- **Guild-specific**: Each Discord server maintains its own independent game list

**API**:
- `loadGames(guildId)` - Load guild's game list
- `saveGames(guildId, games)` - Save guild's game list
- `addGame(guildId, game)` - Add game (returns false if duplicate)
- `removeGame(guildId, game)` - Remove game (returns false if not found)
- **Auto-initialization**: Creates directory structure automatically on first use

## Internationalization (i18n)

- **Default language**: French (fallback: English)
- **Translations**: `src/locales/en.ts` and `src/locales/fr.ts`
- **Configuration**: `src/plugins/i18n.ts`
- **Usage**: `i18next.t('translation.key', { variable: value })`
- **Bilingual commands**: All commands include both English and French descriptions
- Supports pluralization for context-aware translations

## Configuration

**Environment Variables** (`.env`):
- `DISCORD_TOKEN` - **Required** Discord bot token
- `PREFIX` - Command prefix (optional, defaults to empty string)

**Module System**: ES Modules with NodeNext resolution (not CommonJS).

## Technical Notes

- **Persistent storage**: Guild-specific game lists stored in `data/games/` as JSON files
- **Node version**: v24.11.0 (managed via Volta)
- **Package manager**: Yarn v4.10.3 (managed via Volta)
- **Build output**: Compiled to `dist/` directory (git-ignored)
- **Development**: Uses `tsx` for hot reload
- **Message cleanup**: Bot deletes user command messages automatically
- **Error responses**: Include bot mention and use i18n translations
