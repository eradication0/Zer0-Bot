exports.run = function(bot, message, args, discord) {
	var embed = new discord.RichEmbed()
    if (message.author.id === '64438454750031872') {
        embed.setTitle('Shutting down bot')
		message.channel.send({ embed });
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    } else {
		embed.setTitle('You dont have permission to do that. :^)')
		message.channel.send({ embed });
    }
}
