exports.run = function(bot, message, args, discord) {
		message.channel.sendMessage('pong')
		const embed = new discord.RichEmbed().setColor('#e5372e')
		.setTitle('pong')
		message.channel.sendEmbed(embed)
}
