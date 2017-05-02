exports.run = function(bot, message, args, discord, settings) {
	const embed = new discord.RichEmbed()
	console.log(args)
	if (args === 0) {
		embed.setTitle('Your Reminder')
		.setURL('https://calendar.google.com/calendar/render?action=TEMPLATE&text="' + message.content.slice(10).replace(/\s/g, settings.prefix) + '"')
		.setColor('#6DC066')
		message.channel.sendEmbed(embed)
	} else {
		embed.setTitle('Please provide text for the reminder. Example: ' + settings.prefix + 'reminder do homework')
		.setColor('#E54C4C')
		message.channel.sendEmbed(embed)
	}
}
