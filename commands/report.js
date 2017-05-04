exports.run = function(bot, message, args, discord, settings) {
	const reports = require('../reports.json')
	const reportsPath = 'reports.json'
	const fs = require('fs')
	const embed = new discord.RichEmbed()

	let reporter = message.author.id
	let reported = ""

	if (args[0].charAt(3) === '!') {
		reported = args[0].slice(3,-1)
	} else {
		reported = args[0].slice(2,-1)
	}
	console.log(reported)

	if (args.length < 2) {
		embed.setTitle('Wrong amount of arguments. Usage: "' + settings.prefix + 'report @user <reason>"').setColor('#E54C4C')
		message.channel.sendEmbed(embed)
	} else {
		let regex = /(<)+(@)/
		if (!args[0].match(regex)) {
			embed.setTitle('You did not mention a user. Usage: "' + settings.prefix + 'report @user <reason>"').setColor('#E54C4C')
			message.channel.sendEmbed(embed)
		} else {
			if (!reports[reported]) {
				reports[reported] = {"created":0,"recieved":0}
			}
			if (!reports[reporter]) {
				reports[reporter] = {"created":0,"recieved":0}
			}
				// Database write
				let createdCount = reports[reporter].created + 1
				let recievedCount = reports[reported].recieved + 1
				reports[reported].recieved = recievedCount;
				reports[reporter].created = createdCount;
				fs.writeFile(reportsPath, JSON.stringify(reports))
				embed.setTitle('Your #' + reports[reporter].created + ' report was successful. The reported user now have a report count of ' + reports[reported].recieved).setColor('#6DC066')
				message.channel.sendEmbed(embed)

				// Embed logging
				let totalRecieved = 0
				let reportReason = ''

				for (var L in args) {
					reportReason += args[L] + ' '
				}
				for (var I in reports) {
					totalRecieved += reports[I].recieved
				}

				const logEmbed = new discord.RichEmbed()
				.setColor('#8BAFD8')
				.setTitle('Report #' + totalRecieved)
				.setDescription(reportReason)
				bot.channels.get('309601440685359104').sendEmbed(logEmbed)
			}
		}
	}
