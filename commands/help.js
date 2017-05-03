exports.run = function(bot, message, args, discord, settings) {

	const embed = new discord.RichEmbed().setColor('#8BAFD8')

	.addField('Help overview','[Normal Commands]()')
	.addField(settings.prefix + 'help','Shows this message.')
	.addField(settings.prefix + 'autohelp','Shows auto generated help message.')
	.addField(settings.prefix + 'ping','Pings the bot.')

	.addField('\u200b','[Role Commands]()')
	.addField(settings.prefix + 'news','Add this to get notified for all the news.')
	.addField(
		settings.prefix + 'rl \u200b \u200b \u200b'
		+ settings.prefix + 'csgo \u200b \u200b \u200b'
		+ settings.prefix + 'dota \u200b \u200b \u200b'
		+ settings.prefix + 'hots \u200b \u200b \u200b'
		+ settings.prefix + 'lol \u200b \u200b \u200b'
		+ settings.prefix + 'pubg \u200b \u200b \u200b'
		+ settings.prefix + 'ow \u200b \u200b \u200b',
	'\u200b ')

	.addField('\u200b','[Mod Commands]()')
	.addField(settings.prefix + 'servers','Shows all servers the bot is connected to.')
	.addField(settings.prefix + 'kill','Shuts the bot down')

	message.channel.sendEmbed(embed)
}
