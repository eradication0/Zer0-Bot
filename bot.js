console.log('<== STARTING BOT ==>');

	// Loading Requirements
	const discord = require('discord.js')
	const settings = require('./settings.json')
	const fs = require('fs')
	const bot = new discord.Client()
	const jsonfile = require('jsonfile')
	const rand = require('random-int')
	const time = Date.now()

// Functions
    discordLog = (embed) => {
        bot.channels.get('308862930676613121').sendEmbed(embed)
    },

    fileLog = (e) => {
        fs.appendFile('./log.txt', e, (err) => {})
    }


// Initialisation
jsonfile.spaces = 2

// listeners
bot.on('message', (message) => {

	// Dont listen to yourself
	if (message.author.id === bot.user.id) return

	// Dont listen to other bots
	if (message.author.bot) return

	// Bot mentioned
	if (message.isMentioned(bot.user.id)) {}

	// Execute command
	if (!message.content.startsWith(settings.prefix)) return
	const args = message.content.split(' ')
	const command = args.shift().slice(settings.prefix.length)
	try {
		let cmdFile = require('./commands/' + command)
		cmdFile.run(bot, message, args, discord, settings)
	} catch (err) {
		console.log(err)
	}
})

bot.on('guildMemberAdd', member => {
	if (member.guild.roles.has("308864141886619648")) {
		member.addRole("308864141886619648")
	}
})

// Login
bot.login(settings.bottoken)
console.log('<== BOT ONLINE ==>');
