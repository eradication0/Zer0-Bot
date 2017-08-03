exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        if (!profilecheck(message.author.id, message))
            return;
			console.log("tru 1")
        let m = "```markdown\n"
        m += `#==========FACTIONS==========#\n`
        m += `# availiable factions:\n`
        m += `1. Overwatch      // ...  Bonus: +30 Sympathy\n`
        m += `2. Blackwatch     // ...  Bonus: +30 Stealth\n`
        m += `3. Ominc          // ...  Bonus: +30 Armor\n`
        m += `\n`
        m += `# type "-faction <your faction>" to choose your factions.\n`
        m += `# you have to write the factionname small.\n`
        m += `# you can choose your faction only Once!\n`
        m += `#=================================#`
        m += "```"
        message.channel.send(m)
    }




	if (message.content.startsWith('-faction') && message.content.slice(9) in req.fac) {
		console.log("tru 2")
		if (!profilecheck(message.author.id, message))
			return;
			console.log("tru 3")
		if (req.db[message.author.id].faction === "none") {
			message.channel.send(`You are now a member of ${message.content.slice(9)}`)
			req.db[message.author.id].faction = message.content.slice(9)
			req.jsonfile.writeFile(req.dbpath, req.db)
			console.log("tru 4")
		} else {
			console.log("tru 5")
			message.channel.send("You already choose your faction.")
		}
}
