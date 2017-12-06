exports.run = function(bot, message, args, discord, settings, inv) {
	//global vars
	const invPath = './inventory.json'
	const rand = require('random-int')

	//create user if needed
	createUser(message)

	//get user id
	let userid = message.author.id
	if (userid.startsWith("!")) {
		userid = userid.slice(1)
	}

	//check if user got 10 credits
	if (inv[userid].credits < 100) {
		let embed = new discord.RichEmbed().setTitle("You dont have 100 credits for a golden lootbox :^) get gud").setColor("#E54C4C")
		message.channel.send({embed})
		return
	} else {

		//subtract lootbox
		inv[userid].credits += -100
		//save lootbox
		saveInv()
		let randPrizes = rand(0,100)
		let prizes = 0
		if (randPrizes <= 40) { prizes = 6 }
		else if (randPrizes <= 70) { prizes = 7 }
		else if (randPrizes <= 90) { prizes = 8 }
		else if (randPrizes <= 99) { prizes = 9 }
		else if (randPrizes <= 100) { prizes = 10 }
		let embed = new discord.RichEmbed().setTitle("💰📦💰  Your GOLDEN lootbox contains **" + prizes + "** drops 💰📦💰").setColor("#07BEB8")
		message.channel.send({embed})
		const drops = require('../drops.json')

		//loop through each drop
		for (var i = 0; i < prizes; i++) {
			//generate random number
			let randDrop = rand(0,100)

			//define rarity
			let rarity = 0
			if (randDrop <= 60) {rarity = 1}
			else if (randDrop <= 70) { rarity = 2 }
			else if (randDrop <= 90) { rarity = 3 }
			else if (randDrop <= 99) { rarity = 4 }
			else if (randDrop <= 100) { rarity = 5 }

			//get loot index of array
			let dropID = rand(1,drops[rarity].items.length)
			//subtract 1 to not get unfefined
			dropID += -1
			//get the value inside the array
			let actualDrop = drops[rarity].items[dropID]

			//timeout to slow down drops
				//check if drop is a number aka credits
				if (dropID <= 3) {
					let embed = new discord.RichEmbed().setTitle("💳 " + actualDrop).setColor(drops[rarity].color)
					inv[userid].credits += actualDrop
					message.channel.send({embed})

				//if not a number just send the text
				} else {
					let embed = new discord.RichEmbed().setTitle(actualDrop).setColor(drops[rarity].color)
					message.channel.send({embed})
				}
		}
		//save db
		saveInv()
	}
}
