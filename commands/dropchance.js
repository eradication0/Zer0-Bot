exports.run = function(bot, message, args, discord) {
		const embed = new discord.RichEmbed().setColor('#6DC066')
		.setTitle('Lootlist')
		.addField('Box Droprate','📦 0.6% per message')
		.addField('Common','💩 40%',true)
		.addField('Uncommon','💚 30%',true)
		.addField('Rare','💙 20%',true)
		.addField('Epic','💜  9%',true)
		.addField('Legendary','💛  1%',true)
		message.channel.send({ embed });
}
