exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content.startsWith('-giveitem') && message.author.id === '64438454750031872' || message.content.startsWith('-giveitem') && message.author.id === '148764744231157760') {
        for (i in req.db[message.author.id].inventory) {
            if (req.db[message.author.id].inventory[i] === "-") {
                req.db[message.author.id].inventory[i] = message.content.slice(10)
                message.channel.sendMessage(`gave 1 of ${message.content.slice(10)}`)
                return
            }
        }
    }
}
