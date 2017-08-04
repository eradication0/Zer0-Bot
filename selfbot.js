console.log('<== STARTING SELF BOT ==>');

const discord = require('discord.js');
const db = require('./selfbotDB.json');
const dbPath =  'selfbotDB.json'
const urban = require('relevant-urban');
const fs = require('fs');
const bot = new discord.Client();
const rand = require('random-int')
const settings = require('./settings.json')

bot.on('message', message => {
    if (message.author !== bot.user)
        return;

    if (message.cleanContent.startsWith("💻"))
        try {
            const com = eval(message.content.slice(2))
            message.channel.send("✅ " + com)
        } catch (err) {
            message.channel.send("❌" + err)
        }

    if (message.content.startsWith("🍪")) {
        message.channel.send("✅ Zer0 gave a cookie to **(っ◔◡◔)っ :cookie:** " + message.content.slice(2))
    }

    if (message.content.startsWith("🌐")) {
        urban(message.content.slice(2)).then((result) => {
            message.channel.send("✅ **Definition: **" + result.definition)
        })
    }

    if (message.content.startsWith("🎲")) {

        if (message.content.startsWith("🎲 odds")) {
            message.channel.send("⚫⚫⚫⚫-🔴🔴🔴🔴-🔵🔵")
            return
        }

		if (message.content.startsWith("🎲 global")) {
			let rand = Math.trunc(Math.random() * 100)
			if (rand < 69 ) {
				message.channel.send("✝ Lost! You rolled a "+ rand +". **" + db.globalpot + "** coins in Globalpot. ✝")
				return
			} else if (rand > 80) {
				message.channel.send("✝ Lost! You rolled a "+ rand +". **" + db.globalpot + "** coins in Globalpot. ✝")
				return
			} else {
				message.channel.send("🔥🔥🔥 Just snagged the global pot with a " + rand + " ROLL. Won " + db.globalpot + "coins 🔥🔥🔥")
				return
			}
			return
		}

		let rand = Math.random() * 100
        let args = message.content.split(" ")
		let pot = parseInt(args[2])

		if (args.length === 1) {
			message.channel.send("❌ **Usage:*** 🎲 <black/red/blue> <amount>")
			return
		} else if (args.length === 2) {
			message.channel.send("❌ **Usage:*** 🎲 <black/red/blue> <amount>")
			return
		}

		if (pot > db.coins) {
			message.channel.send("❌ Not enough 💰")
			return
		}

		if (db.coin === 0) {
			channel.message.send("You dont have any money :(")
			return
		}


        if (args[1] === "black") {
            test()
            return
        } else if (args[1] === "red") {
            test()
            return
        } else if (args[1] === "blue") {
            test()
            return
        } else {
            message.channel.send("❌ **Usage:*** 🎲 <black/red/blue> <amount>")
            return
        }

        function test() {
            if (rand <= 40) {
                if (args[1] === "black") {
                    db.coins = db.coins + pot
                    message.channel.send("⚫ you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins - pot
					db.globalpot = db.globalpot + pot
                    message.channel.send("⚫ you lost! current balance **" + db.coins + "**")

                }
            } else if (rand <= 80) {
                if (args[1] === "red") {
                    db.coins = db.coins + pot
                    message.channel.send("🔴 you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins - pot
					db.globalpot = db.globalpot + pot
                    message.channel.send("🔴 you lost! current balance **" + db.coins + "**")

                }
            } else if (rand <= 100) {
                if (args[1] === "blue") {
                    db.coins = db.coins + pot * 2
                    message.channel.send("🔵 you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins - pot
					db.globalpot = db.globalpot + pot
                    message.channel.send("🔵 you lost! current balance **" + db.coins + "**")
                }
            }
            fs.writeFile(dbPath, JSON.stringify(db))
        }
    }

	if (message.content.startsWith("💰")) {
		message.channel.send("✅ You have " + db.coins)
	}

});

console.log('<== ONLINE ==>');

bot.login(settings.selfbot)
