exports.run = function(bot, message, args) {
		bot.channels.get(args[0]).join()
}
