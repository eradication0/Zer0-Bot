exports.run = function(bot, message, args, discord) {
    if (message.author.id === '64438454750031872') {
        var embed = new discord.RichEmbed().setTitle('Servers')
        bot.guilds.forEach(guild => {
            if (embed.fields.length === 20) {
				embed.setColor('#6DC066')
                message.channel.sendEmbed(embed)
                embed = new discord.RichEmbed().setTitle('Servers').setColor('#6DC066')
            } else {
                embed.addField(guild.name, guild.id)
            }

        });
        message.channel.sendEmbed(embed)
    } else {
        message.channel.sendMessage("No Permission")
    }

}
