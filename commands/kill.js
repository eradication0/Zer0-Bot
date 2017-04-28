exports.run = function(bot, message, args, discord) {
    if (message.author.id === '64438454750031872') {
        var embed = new discord.RichEmbed().setTitle('Shutting down bot')
		message.channel.sendEmbed(embed)
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    }
}
