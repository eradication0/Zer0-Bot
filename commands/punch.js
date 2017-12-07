exports.run = function(bot, message, args, discord) {
		const embed = new discord.RichEmbed().setColor('#6DC066')
		.setTitle('*dodges* kicks your face with fist')
		message.channel.send({ embed });
}
