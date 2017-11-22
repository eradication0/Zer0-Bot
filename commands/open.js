exports.run = function(bot, message, args, discord, settings, inv) {
	createUser(message)
	// get user id
	let userid = message.author.id
	if (userid.startsWith("!")) {
		userid = userid.slice(1)
	}
	
}
