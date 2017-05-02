exports.run = function(bot, message, args, discord) {

		const embed = new discord.RichEmbed()

		let RoleToFind = "223870392148688896";

		if (message.member.roles.get(RoleToFind)) {
			message.member.removeRole(RoleToFind)
			embed.setTitle('Role removed').setColor('#E54C4C')
			message.channel.sendEmbed(embed)
		} else {
			message.member.addRole(RoleToFind)
			embed.setTitle('Role added').setColor('#6DC066')
			message.channel.sendEmbed(embed)
		}
}
