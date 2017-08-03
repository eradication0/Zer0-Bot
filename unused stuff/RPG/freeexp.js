exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content === '-freeexp' && message.author.id === '64438454750031872' || message.content.startsWith('-freeexp') && message.author.id === '148764744231157760') {
        let dailyexp = req.rand(100, 1000)
        req.db[message.author.id].exp += dailyexp
        message.channel.send(`added ${dailyexp} exp`)
    }
}
