exports.run = function(bot, message, args, discord) {
		const embed = new discord.RichEmbed().setColor('#6DC066')
		.setTitle('no u!')
		message.channel.send({ embed });
}
