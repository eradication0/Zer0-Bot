console.log('<== STARTING BOT ==>');

// Vars
var discord = require('discord.js'),
    request = require('request'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    rand = require('random-int'),
    botpath = './bot.js',
    cmdpath = './commands.js',
    cred = require("./cred.json"),
    bot = new discord.Client(),
    time = Date.now(),

    dailyreset = new cronJob({
        cronTime: '00 00 12 * * *',
        onTick: function reset() {
            for (i in db) {
                db[i].daily = 0
            }
            console.log("reseted the db")
            jsonfile.writeFile(dbpath, db)
        },
        start: false,
        timeZone: "Europe/Berlin"
    }),

// Functions
    discordLog = (embed) => {
        bot.channels.get('266961650693832704').sendEmbed(embed)
    profilecheck = (authorid, msg) => {
        if (db[authorid]) {
            return true
        } else {
            msg.channel.sendMessage("You don't have a profile. Type ``-create`` to create one.")
            return false
        }
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
    return  +  + day + "." + month + "." + year + " - " + hour + ":" + min + ":" + sec + "s";
    }


// listeners
bot.on('message', (message) => {

	// Dont listen to yourself
	if (message.author.id === bot.user.id) return

	// Dont listen to other bots
	if (message.author.bot) return;

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
	if (message.channel.id === "289703044730585088" && message.author.id === '64438454750031872') {
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
		cmdFile.run(bot, message, args, discord)
	} catch (err) {
		const embed = new discord.RichEmbed()
		.setDescription('Error!!')
		.setTimestamp()
		.addField('User' ,`${message.author.username} (${message.author.id})`)
		.addField('Server' ,`${message.guild.name}`)
		.addField('Error' ,err)
		.setColor('#ff0000')
		discordLog(embed)
	}
})


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

bot.login(settings.bottoken)
