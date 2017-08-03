exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        if (!profilecheck(message.author.id, message))
            return
        if (req.db[message.author.id].charclass !== "none") {
            let pickedclass = req.db[message.author.id].charclass
            let m = "```markdown\n"
            m += `#==========${pickedclass.toUpperCase()} SHOP==========#\n`
            m += `# availiable items:\n`
            for (i in req.shop[pickedclass]) {
                m += `${i}. ${req.shop[pickedclass][i]} \n`
            }
            m += `#========================#`
            m += "```"
            message.channel.send(m)
        } else {
            message.channel.send("You have to choose a class first. Type ``-class`` to see all classes.")
        }
}
