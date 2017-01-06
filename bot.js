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
    discordLog = (msg) => {
        bot.channels.get('266961650693832704').sendMessage(msg)
    },

    fileLog = (e) => {
        fs.appendFile('./log.txt', e, (err) => {})
    },

    getDateTime = () => {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return  day + "." + month + "." + year + " - " + hour + ":" + min + ":" + sec + "s";
    }


// Initialisation
jsonfile.spaces = 2

console.log('Setup √')

// listeners
bot.on('message', (message) => {
    if (message.isMentioned(bot.user.id)) {
		let msg = "```markdown\n"
		msg += `< BOT GOT MENTIONED > \n* User: ${message.author.username} (${message.author.id})\n* Server : ${message.guild.name}\n* Channel: ${message.channel.name}\n* Message: ${message.cleanContent}`
		msg += "```"
		discordLog(msg);
    }
	if (message.author.id === bot.user.id) return
	if (message.content.startsWith('.eval') && message.author.id === '64438454750031872') {
		try {
			const com = eval(message.content.split(" ").slice(1).join(" "))
			message.channel.sendMessage('```\n' + com + '```')
		} catch (e) {
			message.channel.sendMessage('```\n' + e + '```')
		}
	}
	if (!message.content.startsWith(settings.prefix)) return
	const args = message.content.split(' ')
	const command = args.shift().slice(settings.prefix.length)
	try {
		let cmdFile = require('./commands/' + command)
		cmdFile.run(bot, message, args)
	} catch (e) {
		console.log(e + '\n');
	}
})

console.log('Commands loaded √')

// Ready
bot.on('ready', () => {
    let msg = "```markdown\n"
    msg += `#=== BOOT TIME STATISTICS ===#\n`
    msg += `+ Time:      ${getDateTime()}\n`
    msg += `+ Users:     ${bot.users.size}\n`
    msg += `+ Servers:   ${bot.guilds.size}\n`
    msg += `+ Channels:  ${bot.channels.size}\n`
    msg += "```"
    discordLog(msg);
	console.log('<== BOT ONLINE ==>')
});

//exports.fs = fs;

bot.login(settings.bottoken)
