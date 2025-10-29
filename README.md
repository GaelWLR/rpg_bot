# 🎲 RPG Bot

A Discord bot for playing RPGs with friends, featuring dice rolling and utility commands.

## ✨ Features

### 🎲 Dice Rolling
- **Roll**: Roll classic RPG dice (d4, d6, d8, d10, d12, d20, d100)
  - Modifier support: `2d6+3`, `1d20-1`
  - Multiple rolls support: `2d6+3 1d20-1`
  - Direct notation without command: `2d6+3`
- **Cheat**: Roll dice with guaranteed minimum result (75% of maximum)

### 🎮 Game Management
- **Game**: Randomly select a game from your guild's persistent list
- **Game Add**: Add games to your guild's list
- **Game Remove**: Remove games from your guild's list
- **Game List**: View all games in your guild's list

### 🛠️ Utility Commands
- **Commands**: List all available commands with usage examples
- **Lang**: Set the bot language for your server (English/French)
- **Rand**: Randomly select an item from a list
- **Insult**: Send a random insult to a mentioned user

### 🌍 Internationalization
- Multilingual support (French and English)
- Default language: French
- Guild-specific language configuration (each server can set its own language)

## 🚀 Installation

### Prerequisites
- Node.js v24+ (v20+ minimum)
- Yarn v4+

### Setup

1. **Clone the project and install dependencies**
```bash
git clone <repository-url>
cd rpg_bot
yarn install
```

2. **Create .env file**
```bash
cp .env.example .env
```

Configure environment variables:
```env
DISCORD_TOKEN=your_discord_bot_token
PREFIX=!                                    # Optional, defaults to !
```

3. **Start the bot**
```bash
# Development (with hot reload)
yarn dev

# Production
yarn build
yarn start
```

## 📖 Usage Examples

> **Note**: Examples below use the default prefix `!`. You can customize this prefix in the `.env` file.

```
# Roll dice
!roll 2d6+3
!roll 1d20
2d6+3           # Direct notation without command or prefix

# Roll with cheat (75% minimum)
!cheat 1d20

# Game management (persistent per guild)
!game_add Darktide
!game_add "Vermintide 2"
!game_list         # View all games in your guild's list
!game              # Randomly select from your guild's games
!game_remove Darktide

# Language configuration (persistent per guild)
!lang en           # Set server language to English
!lang fr           # Set server language to French
!lang              # Show current server language

# Random selection
!rand Pizza, Burger, Sushi

# List all commands with examples
!commands

# Random insult
!insult @user
```

## 🛠️ Development

```bash
# Run in development mode
yarn dev

# Compile TypeScript
yarn build

# Check code
yarn lint

# Format code
yarn format
```

## 📚 Tech Stack

- **Discord.js** v14 - Discord framework
- **TypeScript** - Typed language
- **i18next** - Internationalization
- **ES Modules** - Modern module system

## 📝 Architecture

The bot uses a prefix-based command architecture (not slash commands). Commands are automatically loaded from the `src/commands/` folder and registered in a Collection.

For more details on the architecture, see [CLAUDE.md](./CLAUDE.md).
