exports.run = function(bot, message, args, discord) {
	const embed = new discord.RichEmbed()
	const mainFile = require('../bot.js');
	console.log(mainFile.db)

	//global vars
	let player = message.author.id
	//check for custom nickname
	if (player.startsWith("!")) {
		player = player.slice(1)
	}

	//check if user already have a profile
	if (db[player]) {
		embed.setTitle("You already have a profile.")
		message.channel.sendEmbed(embed)
	} else {
		//create profile
		db[player] = {}
		//profile stats
		db[player].lvl = 1;
		db[player].exp = 1;
		db[player].credits = 1000;
		//dynamic stats
		db[player].health = 100;
		db[player].shield = 10;
		//multiplier stats
		db[player].strength = 1;
		db[player].defense = 1;
		db[player].evasion = 1;
		db[player].class = "rookie";

		embed.setTitle("Pofile created!").setColor('#6DC066')
		message.channel.sendEmbed(embed)
	}
}
