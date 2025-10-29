# 🎲 RPG Bot

A Discord bot for playing RPGs with friends, featuring dice rolling and utility commands.

## ✨ Features

### 🎲 Dice Rolling
- **Roll**: Roll classic RPG dice (d4, d6, d8, d10, d12, d20, d100)
  - Modifier support: `2d6+3`, `1d20-1`
  - Multiple rolls support: `2d6+3 1d20-1`
  - Direct notation without command: `2d6+3`
- **Cheat**: Roll dice with guaranteed minimum result (75% of maximum)

### 🎮 Utility Commands
- **Rand**: Randomly select an item from a list
- **Game**: Randomly select a game from a configured list
- **Insult**: Send a random insult to a mentioned user

### 🌍 Internationalization
- Multilingual support (French and English)
- Default language: French

## 🚀 Installation

### Prerequisites
- Node.js v20+
- Yarn

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
RAND_GAMES=Game1,Game2,Game3               # Game list for the game command
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

# Random selection
!rand Pizza, Burger, Sushi
!game           # Selects a game from the configured list

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
