module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-faction' || message.content === '-frc') {
	        if (!profilecheck(message.author.id, message))
	            return;
	        let m = "```markdown\n"
	        m += `#==========FACTIONS==========#\n`
	        m += `# availiable factions:\n`
	        m += `1. Overwatch      // ...  Bonus: +30 Sympathy\n`
	        m += `2. Blackwatch     // ...  Bonus: +30 Stealth\n`
	        m += `3. Ominc          // ...  Bonus: +30 Armor\n`
	        m += `\n`
	        m += `# type "-factions <your faction>" to choose your factions.\n`
	        m += `# you have to write the factionname small.\n`
	        m += `# you can choose your faction only Once!\n`
	        m += `#=================================#`
	        m += "```"
	        message.channel.sendMessage(m)
	    }

		if (message.content.startsWith('-faction') && message.content.slice(10) in frc) {
			if (!profilecheck(message.author.id, message))
				return;
			if (db[message.author.id].fraction === "none") {
				message.channel.sendMessage(`You are now a member of ${message.content.slice(10)}`)
				db[message.author.id].fraction = message.content.slice(10)
				jsonfile.writeFile(dbpath, db)
			} else {
				message.channel.sendMessage("You already choose your faction.")
			}
		}
    })
}
