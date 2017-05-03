exports.run = function(bot, message, args, discord, settings) {
	const embed = new discord.RichEmbed()
	const reports = require('../reports.json')

	if (args.length < 2) {
		embed.setTitle('Wrong amount of arguments. Usage: "' + settings.prefix + 'report @user <reason>"').setColor('#E54C4C')
		message.channel.sendEmbed(embed)
	} else {
		let regex = /(<)+(@)/
		if (!args[0].match(regex)) {
			embed.setTitle('You did not mention a user. Usage: "' + settings.prefix + 'report @user <reason>"').setColor('#E54C4C')
			message.channel.sendEmbed(embed)
		} else {
			if (!reports[args[0]]) {
				message.channel.sendMessage("helo chewy :^)")
			}
			embed.setTitle('Your report was successful. The reported user now have a report count of ' + reports[args[0]].count ).setColor('#6DC066')
			message.channel.sendEmbed(embed)
		}
	}
}
