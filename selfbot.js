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

    if (message.content.startsWith("🌐")) {
        urban(message.content.slice(2)).then((result) => {
            message.channel.send("✅ **Definition: **" + result.definition)
        })
    }

	if (message.content.startsWith("🍪")) {
		let runCMD = require('./command.js')
		message.channel.send("1. MAIN FILE: you have **" + db.cookies + "** cookies")
		runCMD.run(message, db)
		message.channel.send("4. MAIN FILE: you have **" + db.cookies + "** cookies")
	}
})

console.log('<== ONLINE ==>');

bot.login(settings.selfbot)
