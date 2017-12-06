exports.run = function(bot, message, args, discord) {
		const embed = new discord.RichEmbed().setColor('#6DC066')
		.setTitle('Lootlist')
		.addField('Box Droprate','📦 0.6% per message')
		.addField('Common','💩 40%')
		.addField('Uncommon','💚 30%')
		.addField('Rare','💙 20%')
		.addField('Epic','💜  9%')
		.addField('Legendary','💛  1%')
		message.channel.send({ embed });
}
