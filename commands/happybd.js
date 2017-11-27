exports.run = function(bot, message, args, discord, settings, inv) {
	var embed = new discord.RichEmbed()
	const fs = require('fs')
    if (message.author.id === '64438454750031872') {

		let userid = args[0]
		if (userid.startsWith("!")) {
			userid = userid.slice(1)
		}
			console.log(message.author.username + " was presented a lootbox")
			const embed = new discord.RichEmbed().setTitle('Happy Birthday 📦 <@'+userid+'> you just got a Lootbox').setColor('#07BEB8')
			message.channel.send({embed})
			// write into database
			inv[userid].boxes += 1
			fs.writeFile(invPath, JSON.stringify(inv))
		message.channel.send({ embed });
    } else {
		embed.setTitle('You dont have permission to do that. :^)')
		message.channel.send({ embed });
    }
}
