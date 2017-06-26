console.log('Starting bot..');

// loading requirements
const discord = require('discord.js')
const settings = require('./settings.json')
const fs = require('fs')
const bot = new discord.Client()
const rand = require('random-int')
const db = require('./rpg.json')
const dbPath = './rpg.json'

// db backup
dbBackup = () => {
	setTimeout(function() {
		fs.writeFileSync(dbPath, JSON.stringify(db))
		dbBackup()
		let time = new Date()
		console.log("RPG DB Backuped √ " + time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" "+time.getDate()+"/"+time.getMonth()+"/"+time.getFullYear())
	}, 15000); //every 15 secs
}
dbBackup()

// listeners

// add role on guild join
bot.on('guildMemberAdd', member => {
	if (member.guild.roles.has("308864141886619648")) {
		member.addRole("308864141886619648")
	}
})


bot.on('message', (message) => {

	// dont listen to yourself
	if (message.author.id === bot.user.id)
		return

		// dont listen to other bots
	if (message.author.bot)
		return

		// execute command
	if (!message.content.startsWith(settings.prefix))
		return
	const args = message.content.split(' ')
	const command = args.shift().slice(settings.prefix.length)
	try {
		let cmdFile = require('./commands/' + command)
		cmdFile.run(bot, message, args, discord, settings, db)
	} catch (err) {

	}

	// RPG STUFF --------------------

	//global vars
	let player = message.author.id
	const embed = new discord.RichEmbed()
	//check for custom nickname
	if (player.startsWith("!")) {
		player = player.slice(1)
	}

	// RPG START
	if (message.content.startsWith("+rpg start")) {
		//check if user already have a profile
		if (db[player]) {
			embed.setTitle("You already have a profile.")
			message.channel.sendEmbed(embed)
			return
		} else {
			//create profile
			db[player] = {}
			//profile stats
			db[player].lvl = 1;
			db[player].exp = 1;
			db[player].credits = 1000;
			//dynamic stats
			db[player].health = 100;
			db[player].maxhealth = 100;
			db[player].shield = 10;
			db[player].maxshield = 10;
			//multiplier stats
			db[player].strength = 1;
			db[player].defense = 1;
			db[player].evasion = 1;
			db[player].class = "rookie";

			embed.setTitle("Pofile created!").setColor('#6DC066')
			message.channel.sendEmbed(embed)
			return
		}
	}

	// RPG MEMBER AREA
	if (message.content.startsWith("+rpg")) {
		if (!db[player]) {
			embed.setTitle("You dont have a profile. Please use ``+rpg start``")
			message.channel.sendEmbed(embed)
			return
		}
	}

	if (message.content.startsWith("+rpg profile")) {
		embed.setTitle(message.author.username + "'s Profile")
		.setURL(message.author.avatarURL)
		.addField("⭐ Level", db[player].lvl, true)
		.addField("✨ Experience", db[player].exp, true)
		.addField("💳 Credits", db[player].credits, true)
		.addField("💕 Health", db[player].health + " / " + db[player].maxhealth, true)
		.addField("💠 Shield", db[player].shield+ " / " + db[player].maxshield, true)
		.addField("Str/Eva/Def", db[player].strength+" / "+db[player].evasion+" / "+db[player].defense, true)
		.addField("🏷 Class", db[player].class, false)
		message.channel.sendEmbed(embed)
		return
	}
})

// login
bot.login(settings.bottoken)
console.log('Bot Online √');
