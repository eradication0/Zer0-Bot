exports.run = function(bot, message, args, discord, settings) {
	const reports = require('../reports.json')
	const embed = new discord.RichEmbed().setColor('#ffdb00')

	let ary = []

	for (var I in reports) {
		ary.push(reports[I])
	}

	ary.sort(function(a, b) {
		return b.created - a.created
	});

	embed.setTitle("Top 5 Best :star:")
	for (var i = 0; i < ary.length; i++) {
		embed.addField('#' + (i+1) + ' with **' + ary[i].created + '** Reports given', '<@' + ary[i].id + '>')
		ary[i].created
		if (i === 6) { break }
	}

	message.channel.sendEmbed(embed)

}
