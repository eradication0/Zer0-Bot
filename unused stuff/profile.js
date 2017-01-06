exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        if (!profilecheck(message.author.id, message))
            return;
        let crd = req.db[message.author.id].credits
        let exp = req.db[message.author.id].exp
        let fac = req.db[message.author.id].faction
        let lvl = Math.trunc(Math.log(exp / 1) / Math.log(3));
        let ncls = req.db[message.author.id].charclass
        let m = "```markdown\n"
        m += `#==========PROFILE==========#\n`
        m += `+ Class: ${ncls}\n`
        m += `+ faction: ${fac}\n`
        m += `+ Level: ${lvl}\n`
        m += `+ Credits: ${crd}\n`
        m += `+ Exp: ${exp}\n`
        m += `#===========================#`
        m += "```"
        message.channel.sendMessage(m)
}
