exports.run = function(bot, message, args, discord) {
	const embed = new discord.RichEmbed().setColor('#e5372e')
	.setTitle('Reminder')
	.setDescription('Your Reminder: <https://calendar.google.com/calendar/render?action=TEMPLATE&text="' + message.content.slice(10).replace(/\s/g, "+") + ">")
	message.channel.sendEmbed(embed)
}
