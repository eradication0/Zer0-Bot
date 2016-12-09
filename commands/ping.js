exports.run = function(bot, message, args) {
	var req = require('../bot.js');
	if (message.content.startsWith('-ping')) {
		message.channel.sendMessage('pong')
	}
};
