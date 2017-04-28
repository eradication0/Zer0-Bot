exports.run = function(bot, message, args, discord) {
    if (message.author.id === '64438454750031872') {
        var embed = new discord.RichEmbed().setTitle('Servers').setColor('#e5372e')
        bot.guilds.forEach(guild => {
            if (embed.fields.length === 20) {
                message.channel.sendEmbed(embed)
                embed = new discord.RichEmbed().setTitle('Servers').setColor('#e5372e')
            } else {
                embed.addField(guild.name, guild.id)
            }

        });
        message.channel.sendEmbed(embed)
    } else {
        message.channel.sendMessage("You don't have permission to execute that command.")
    }

}
