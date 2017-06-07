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
            message.channel.sendMessage(":white_check_mark: " + com)
        } catch (err) {
            message.channel.sendMessage(":x:" + err)
        }

    if (message.content.startsWith("🍪")) {
        message.channel.sendMessage("Zer0 gave a cookie to **(っ◔◡◔)っ :cookie:** " + message.content.slice(2))
    }

    if (message.content.startsWith("🌐")) {
        urban(message.content.slice(2)).then((result) => {
            message.channel.sendMessage(":globe_with_meridians: **Definition: **" + result.definition)
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
        message.channel.sendMessage(":8ball: ** ( ‾ʖ̫‾)つ──☆*:・ﾟ **" + item)
    }

    if (message.content.startsWith("🎲")) {
        let rand = Math.random() * 100
        let choice = message.content.slice(3)

        if (message.content.startsWith("🎲 odds")) {
            message.channel.sendMessage("Your odds are: 40% ⚫/🔴 and 20% 🔵")
            return
        }

        if (choice === "black") {
            test()
            return
        } else if (choice === "red") {
            test()
            return
        } else if (choice === "blue") {
            test()
            return
        } else {
            message.channel.sendMessage("please specify your predicition (black/red/blue)")
            return
        }

        function test() {
            if (rand <= 40) {
                if (choice === "black") {
                    db.coins = db.coins * 2
                    message.channel.sendMessage("⚫ you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins / 2
                    message.channel.sendMessage("⚫ you lost! current balance **" + db.coins + "**")

                }
            } else if (rand <= 80) {
                if (choice === "red") {
                    db.coins = db.coins * 2
                    message.channel.sendMessage("🔴 you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins / 2
                    message.channel.sendMessage("🔴 you lost! current balance **" + db.coins + "**")

                }
            } else if (rand <= 100) {
                if (choice === "blue") {
                    db.coins = db.coins * 4
                    message.channel.sendMessage("🔵 you won! current balance **" + db.coins + "**")

                } else {
                    db.coins = db.coins / 4
                    message.channel.sendMessage("🔵 you lost! current balance **" + db.coins + "**")
                }
            }
			fs.writeFile(dbPath, JSON.stringify(db))
        }
    }
});

console.log('<== ONLINE ==>');

bot.login("NjQ0Mzg0NTQ3NTAwMzE4NzI.CpdQfw.R_65TGcJPOzJALkYkZ3US8RkbI8")
