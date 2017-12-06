exports.run = function(bot, message, args, discord) {
		const embed = new discord.RichEmbed().setColor('#6DC066')
		.setTitle('Lootlist')
		.addField('Box Droprate','📦 2/300 ')
		.addField('Common','💩 40/100 ')
		.addField('Uncommon','💚 30/100 ')
		.addField('Rare','💙 20/100 ')
		.addField('Epic','💜  9/100 ')
		.addField('Legendary','💛 1/100 ')
		message.channel.send({ embed });
}
