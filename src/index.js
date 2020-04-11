const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')

// Create client
const client = new Discord.Client()
client.commands = new Discord.Collection()

// Retrieves commands
const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)

  client.commands.set(command.name, command)
}

// Get command from server message
client.on('message', (message) => {
  if (message.content.startsWith(prefix)) {
    const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/)
    const command = client.commands.get(commandName.toLowerCase())

    if (command) {
      try {
        command.execute(message, args)
      } catch (error) {
        console.error(error)
        message.channel.send('A problem occurred during the execution of the command!')
      }
    } else {
      message.channel.send('Command not supported!')
    }
  }
})

client.login(token)
