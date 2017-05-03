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

console.log('Setup √')

// listeners
bot.on('message', (message) => {

	// Dont listen to yourself
	if (message.author.id === bot.user.id) return

	// Dont listen to other bots
	if (message.author.bot) return

	// Bot mentioned
	if (message.isMentioned(bot.user.id)) {
		const embed = new discord.RichEmbed()
		.setDescription('Bot got mentioned')
		.setTimestamp()
		.addField('User' ,`${message.author.username} (${message.author.id})`)
		.addField('Server' ,`${message.guild.name}`)
		.addField('Message' ,`${message.cleanContent}`)
		.setColor('#0000ff')
		discordLog(embed)
    }

	// Console
	if (message.channel.id === "308901535989891072" && message.author.id === '64438454750031872') {
		try {
			const com = eval(message.content)
			const embed = new discord.RichEmbed()
			.setTitle(com)
			message.channel.sendEmbed(embed)
		} catch (err) {
			const embed = new discord.RichEmbed()
			.setTitle(err)
			message.channel.sendEmbed(embed)
		}
	}

	// Execute command
	if (!message.content.startsWith(settings.prefix)) return
	const args = message.content.split(' ')
	const command = args.shift().slice(settings.prefix.length)
	try {
		let cmdFile = require('./commands/' + command)
		cmdFile.run(bot, message, args, discord, settings)
	} catch (err) {
		const embed = new discord.RichEmbed()
		.setDescription('Error!!')
		.setTimestamp()
		.addField('User' ,`${message.author.username} (${message.author.id})`)
		.addField('Server' ,`${message.guild.name}`)
		.addField('Error' ,err)
		.setColor('#ff0000')
		discordLog(embed)
		console.log(err)
	}
})

bot.on('guildMemberAdd', member => {
if (guild.id === '134436989175988224') {
	member.guild.defaultChannel.send(`test message ${member}!`);

}
})

console.log('Commands loaded √')

// Ready
bot.on('ready', () => {
	const embed = new discord.RichEmbed()
	.setTimestamp()
	.addField('Users' , bot.users.size)
	.addField('Servers' , bot.guilds.size)
	.addField('Channels' , bot.channels.size)
	.setColor('#00ff00')
	discordLog(embed)
	console.log('<== BOT ONLINE ==>')
});

// Login
bot.login(settings.bottoken)
