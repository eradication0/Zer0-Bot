exports.run = function(bot, message, args, discord) {
		const embed = new discord.RichEmbed().setColor('#6DC066')
		.setTitle('Regeln für loot, Rollenfarben müssen unterscheidbar von bereits vorhanden Rollen sein')
		.addField('Renaming darf nicht extrem anstossend oder rechtsradikal sein','Falls unklarheiten gibt hat ACE immer das letzte wort')
		message.channel.send({ embed });
}
