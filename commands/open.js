exports.run = function(bot, message, args, discord, settings, inv) {
	createUser(message)
	// get user id
	let userid = message.author.id
	if (userid.startsWith("!")) {
		userid = userid.slice(1)
	}
	console.log(inv.userid.boxes)

	if (inv.userid.boxes === 0) {
		let embed = new discord.RichEmbed().setTitle("You dont have a lootbox :^) get gud").setColor("#E54C4C")
		message.channel.send({embed})
	} else {
		let randPrizes = rand(0,100)
		let prizes = 0
		if (randPrizes <= 30) { prizes = 1 }
		else if (randPrizes <= 50) { prizes = 2 }
		else if (randPrizes <= 70) { prizes = 3 }
		else if (randPrizes <= 90) { prizes = 4 }
		else if (randPrizes <= 100) { prizes = 5 }
		let embed = new discord.RichEmbed().setTitle("Your lootbox contains **" + randPrizes + "** drops").setColor("#006FEC")
		message.channel.send({embed})
		for (var i = 0; i < randPrizes; i++) {
			setTimeout(function () {
				let embed = new discord.RichEmbed().setTitle("🎇").setColor("#006FEC")
				message.channel.send({embed})
			}, randPrizes * 100);

		}
	}

}
