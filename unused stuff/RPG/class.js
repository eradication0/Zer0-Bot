exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content === '-class') {
        if (!profilecheck(message.author.id, message))
            return;
        let m = "```markdown\n"
        m += `#==========CLASSES==========#\n`
        m += `# availiable classes:\n`
        m += `1. Tank      // Low Damage,  High Health. Bonus: Armor\n`
        m += `2. Offensive // High Damage, Mid Health.  Bonus: Damage\n`
        m += `3. Defensive // Mid Damage,  Mid Health.  Bonus: Special Skills\n`
        m += `4. Support   // Low Damage,  Mid Health.  Bonus: Evasion, Healing\n`
        m += `5. Sniper    // High Damage, Low Health.  Bonus: Long Range\n`
        m += `6. Builder   // Low Damage,  Mid Health.  Bonus: Build skill\n`
        m += `\n`
        m += `# type "-class <your class>" to choose your class.\n`
        m += `# you have to write the classname small.\n`
        m += `# You can choose your class only Once!\n`
        m += `#===========================#`
        m += "```"
        message.channel.sendMessage(m)
    }

    if (message.content.startsWith('-class') && message.content.slice(7) in req.cls) {
        if (!profilecheck(message.author.id, message))
            return;
        if (req.db[message.author.id].charclass === "none") {
            message.channel.sendMessage(`You selected class ${message.content.slice(7)}`)
            req.db[message.author.id].charclass = message.content.slice(7)
            req.jsonfile.writeFile(req.dbpath, req.db)
        } else {
            message.channel.sendMessage("You already choose your class.")
        }
    }
}
