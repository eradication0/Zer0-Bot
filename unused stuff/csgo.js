exports.run = function(bot, message, args, discord) {

		const embed = new discord.RichEmbed()

		let RoleToFind = "307138198608412673";

		if (message.member.roles.get(RoleToFind)) {
			message.member.removeRole(RoleToFind)
			embed.setTitle('Role removed').setColor('#E54C4C')
			message.channel.send({embed})
		} else {
			message.member.addRole(RoleToFind)
			embed.setTitle('Role added').setColor('#6DC066')
			message.channel.send({embed})
		}
}
