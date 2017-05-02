exports.run = function(bot, message, args) {
		bot.channels.get(message.member.voiceChannelID).leave();
}
