exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content.startsWith('-eval') && message.author.id === '64438454750031872' || message.content.startsWith('.eval') && message.author.id === '148764744231157760') {
        try {
            const com = eval(message.content.split(" ").slice(1).join(" "))
            message.channel.sendMessage('```\n' + com + '```')
        } catch (e) {
            message.channel.sendMessage('```\n' + e + '```')
        }
    }
}
