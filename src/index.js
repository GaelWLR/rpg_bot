/** @typedef {import('discord.js').Message} Message */
const fs = require('fs')
const Discord = require('discord.js')
const i18n = require('./plugins/i18n')
const diceService = require('./services/dice')
const { prefix, token } = loadConfig()

// Create client
const client = new Discord.Client()
client.commands = new Discord.Collection()

// Retrieves available commands
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'))
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

// Add listener to get command from server message
client.on('message', (message) => {
  if (message.content.startsWith(prefix)) {
    const [commandName, ...args] = message.content.slice(prefix.length).toLowerCase().split(/ +/)
    const command = client.commands.get(commandName)

    if (command) {
      executeCommand(command, args, message)
    } else if (commandName.match(diceService.regex)) {
      executeCommand(client.commands.get('roll'), [commandName], message)
    } else {
      message.channel.send(i18n.t('command_not_supported'))
    }
  }
})

// Mount client
client.login(token)

/**
 * Load config file or throw error
 */
function loadConfig() {
  try {
    return require('./config.json')
  } catch (error) {
    console.error('Missing src/config.json')
    process.exit(1)
  }
}

/**
 * Execute the given command and handle error
 * @param {Object} command
 * @param {Array} args
 * @param {Message} message
 */
function executeCommand(command, args, message) {
  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.channel.send(i18n.t('a_problem_occured'))
  }
}
