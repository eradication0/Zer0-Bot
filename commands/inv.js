exports.run = function(bot, message, args, discord, settings, inv) {
	createUser(message)
	// get user id
	let userid = message.author.id
	if (userid.startsWith("!")) {
		userid = userid.slice(1)
	}
	const embed = new discord.RichEmbed().setColor('#6DC066')
	.setTitle(message.author.username + "'s inventory")
	.setURL("https://discord.me/swisscommunity")
	.addField("📦 " + inv[userid].boxes,"💳 " + inv[userid].credits)
	message.channel.send({ embed });
}
