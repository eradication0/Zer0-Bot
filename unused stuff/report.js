exports.run = function(bot, message, args, discord, settings) {
	const reports = require('../reports.json')
	const reportsPath = 'reports.json'
	const fs = require('fs')
	const embed = new discord.RichEmbed()


	// giver ID
	let giver = message.author.id
	if (giver.startsWith("!")) {
		giver = giver.slice(1)
	}

	// reciever ID
	let reciever = ""
	if (args[0].charAt(3) === '!') {
		reciever = args[0].slice(3,-1)
	} else {
		reciever = args[0].slice(2,-1)
	}
	if (reciever.startsWith("!")) {
		reciever = reciever.slice(1)
	}

	if (args.length < 2) {
		embed.setTitle('Wrong amount of arguments. Usage: "' + settings.prefix + 'report @user <reason>"').setColor('#E54C4C')
		message.channel.send({ embed });
	} else {
		let regex = /(<)+(@)/
		if (!args[0].match(regex)) {
			embed.setTitle('You did not mention a user. Usage: "' + settings.prefix + 'report @user <reason>"').setColor('#E54C4C')
			message.channel.send({ embed });
		} else {
			if (reciever === giver) {
				embed.setTitle('You cant report yourself :^)')
				message.channel.send({ embed });
				return
			}
			if (!reports[reciever]) {
				reports[reciever] = {"rep":0,"cooldown":0}
				reports[reciever].id = reciever;
			}
			if (!reports[giver]) {
				reports[giver] = {"rep":0,"cooldown":0}
				reports[giver].id = giver;
			}
			// Database write
			let createdCount = reports[giver].created + 1
			let recievedCount = reports[reciever].recieved + 1
			reports[reciever].recieved = recievedCount;
			reports[giver].given = createdCount;
			fs.writeFile(reportsPath, JSON.stringify(reports))

			// Response
			embed.setTitle('Your #' + reports[giver].created + ' report was created. reciever subject now have ' + reports[reciever].recieved + ' reports. Thanks for your cooperation').setColor('#6DC066')
			message.channel.send({ embed });

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
			bot.channels.get('309601440685359104').send({embed: logEmbed})
		}
	}
}
