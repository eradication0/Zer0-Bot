exports.run = function(bot, message, args, discord, settings, inv) {

	createUser(message)
	// get user id
	let userid = message.author.id
	if (userid.startsWith("!")) {
		userid = userid.slice(1)
	}

	if (inv[userid].boxes === 0) {
		let embed = new discord.RichEmbed().setTitle("You dont have a lootbox :^) get gud").setColor("#E54C4C")
		message.channel.send({embed})
		return
	} else {
		const rand = require('random-int')
		let randPrizes = rand(0,100)
		let prizes = 0
		if (randPrizes <= 30) { prizes = 1 }
		else if (randPrizes <= 50) { prizes = 2 }
		else if (randPrizes <= 80) { prizes = 3 }
		else if (randPrizes <= 99) { prizes = 4 }
		else if (randPrizes <= 100) { prizes = 5 }
		let embed = new discord.RichEmbed().setTitle("📦 Your lootbox contains **" + prizes + "** drops").setColor("#07BEB8")
		message.channel.send({embed})
		const drops = require('../drops.json')
		for (var i = 0; i < prizes; i++) {
			let randDrop = rand(0,100)
			let rarity = 0
			if (randDrop <= 60) {rarity = 1}
			else if (randDrop <= 70) { rarity = 2 }
			else if (randDrop <= 90) { rarity = 3 }
			else if (randDrop <= 99) { rarity = 4 }
			else if (randDrop <= 100) { rarity = 5 }
			setTimeout(function () {
				let dropID = rand(1,drops[rarity].items.length)
				dropID += -1
				let actualDrop = drops[rarity].items[dropID]
				if (actualDrop <= 4) {
					let embed = new discord.RichEmbed().setTitle("💳 " + actualDrop).setColor(drops[rarity].color)
					message.channel.send({embed})
				} else {
					let embed = new discord.RichEmbed().setTitle(actualDrop).setColor(drops[rarity].color)
					message.channel.send({embed})
				}
			}, i * 500);
		}
	}
}
