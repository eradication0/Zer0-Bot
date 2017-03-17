exports.run = function(bot, message, args, discord) {

    const embed = new discord.RichEmbed().setTitle('Servers').setColor('#e5372e')
	bot.guilds.forEach(guild => {
		embed.addField(guild.name, guild.id)
	});
    message.channel.sendEmbed(embed)
}
