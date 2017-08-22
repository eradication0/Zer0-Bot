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
}

console.log('<== ONLINE ==>');

bot.login(settings.selfbot)
