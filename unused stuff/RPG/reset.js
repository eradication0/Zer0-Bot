exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content === '-reset' && message.author.id === '64438454750031872' || message.content.startsWith('-reset') && message.author.id === '148764744231157760') {
        for (i in req.db) {
            req.db[i].daily = 0
        }
        message.channel.sendMessage("daily reset!")
    }
}
