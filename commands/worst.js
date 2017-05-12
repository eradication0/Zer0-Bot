exports.run = function(bot, message, args, discord, settings) {
	const reports = require('../reports.json')
	const embed = new discord.RichEmbed().setColor('#b25a00')

	let ary = []

	for (var I in reports) {
		ary.push(reports[I])
	}

	ary.sort(function(a, b) {
		return b.recieved - a.recieved
	});

	embed.setTitle("Top 5 Loosers :poop:")
	for (var i = 0; i < ary.length; i++) {
		embed.addField('#' + (i+1) + ' with **' + ary[i].recieved + '** Reports taken', '<@' + ary[i].id + '>')
		ary[i].recieved
		if (i === 6) { break }
	}

	message.channel.sendEmbed(embed)

}
