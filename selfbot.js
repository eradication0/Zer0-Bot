console.log('<== STARTING SELF BOT ==>');

const discord = require('discord.js');
const db = require('./selfbotDB.json');
const dbPath =  'selfbotDB.json'
const urban = require('relevant-urban');
const fs = require('fs');
const bot = new discord.Client();

bot.on('message', message => {
    if (message.author !== bot.user)
        return;

    if (message.cleanContent.startsWith("💻"))
        try {
            const com = eval(message.content.slice(2))
            message.channel.sendMessage("✅ " + com)
        } catch (err) {
            message.channel.sendMessage("❌" + err)
        }

    if (message.content.startsWith("🍪")) {
        message.channel.sendMessage("✅ Zer0 gave a cookie to **(っ◔◡◔)っ :cookie:** " + message.content.slice(2))
    }

    if (message.content.startsWith("🌐")) {
        urban(message.content.slice(2)).then((result) => {
            message.channel.sendMessage("✅ **Definition: **" + result.definition)
        })
    }

    if (message.content.startsWith("🎱")) {
        let answers = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes definitely",
            "You may rely on it",
            "As I see it",
            "yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "sources say no",
            "Outlook not so good",
            "Very doubtful"
        ]
        var item = answers[Math.floor(Math.random() * answers.length)];
        message.channel.sendMessage("✅ ** ( ‾ʖ̫‾)つ──☆*:・ﾟ **" + item)
    }

    if (message.content.startsWith("🎲")) {

        if (message.content.startsWith("🎲 odds")) {
            message.channel.sendMessage("⚫⚫⚫⚫-🔴🔴🔴🔴-🔵🔵")
            return
        }

		if (message.content.startsWith("🎲 global")) {
			let rand = Math.trunc(Math.random() * 100)
			if (rand < 69 ) {
				message.channel.sendMessage("✝ Lost! You rolled a "+ rand +". **" + db.globalpot + "** coins in Globalpot. ✝")
				return
			} else if (rand > 80) {
				message.channel.sendMessage("✝ Lost! You rolled a "+ rand +". **" + db.globalpot + "** coins in Globalpot. ✝")
				return
			} else {
				message.channel.sendMessage("🔥🔥🔥 Just snagged the global pot with a " + rand + " ROLL. Won " + db.globalpot + "coins 🔥🔥🔥")
				return
			}
			return
		}

		let rand = Math.random() * 100
        let args = message.content.split(" ")
		let pot = parseInt(args[2])

		if (args.length === 1) {
			message.channel.sendMessage("❌ **Usage:*** 🎲 <black/red/blue> <amount>")
			return
		} else if (args.length === 2) {
			message.channel.sendMessage("❌ **Usage:*** 🎲 <black/red/blue> <amount>")
			return
		}

		if (pot > db.coins) {
			message.channel.sendMessage("❌ Not enough 💰")
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
            message.channel.sendMessage("❌ **Usage:*** 🎲 <black/red/blue> <amount>")
            return
        }

        function test() {
            if (rand <= 40) {
                if (args[1] === "black") {
                    db.coins = db.coins + pot
                    message.channel.sendMessage("⚫ you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins - pot
					db.globalpot = db.globalpot + pot
                    message.channel.sendMessage("⚫ you lost! current balance **" + db.coins + "**")

                }
            } else if (rand <= 80) {
                if (args[1] === "red") {
                    db.coins = db.coins + pot
                    message.channel.sendMessage("🔴 you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins - pot
					db.globalpot = db.globalpot + pot
                    message.channel.sendMessage("🔴 you lost! current balance **" + db.coins + "**")

                }
            } else if (rand <= 100) {
                if (args[1] === "blue") {
                    db.coins = db.coins + pot * 2
                    message.channel.sendMessage("🔵 you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins - pot
					db.globalpot = db.globalpot + pot
                    message.channel.sendMessage("🔵 you lost! current balance **" + db.coins + "**")
                }
            }
            fs.writeFile(dbPath, JSON.stringify(db))
        }
    }

	if (message.content.startsWith("💰")) {
		message.channel.sendMessage("✅ You have " + db.coins)
	}

});

console.log('<== ONLINE ==>');

bot.login("NjQ0Mzg0NTQ3NTAwMzE4NzI.CpdQfw.R_65TGcJPOzJALkYkZ3US8RkbI8")
