exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content.startsWith('.kill') && message.author.id === '64438454750031872' || message.content.startsWith('.kill') && message.author.id === '148764744231157760') {
        message.channel.sendMessage('shutting bot down')
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    }
}
