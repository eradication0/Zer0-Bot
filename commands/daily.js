exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content === '-daily' || message.content === '-dly') {
        if (!profilecheck(message.author.id, message))
            return;

        if (req.db[message.author.id].daily === 0) {
            let dailyexp = req.rand(100, 1000)
            let dailycredits = req.rand(100, 1000)
            req.db[message.author.id].exp += dailyexp
            req.db[message.author.id].credits += dailycredits
            req.db[message.author.id].daily = 1
            req.jsonfile.writeFile(req.dbpath, req.db)
            let m = "```markdown\n"
            m += `#==========DAILY REWARD!==========#\n`
            m += `# Credits: +${dailycredits}\n`
            m += `# Exp: +${dailyexp}\n`
            m += `#=================================#`
            m += "```"
            message.channel.sendMessage(m)
        } else {
            message.channel.sendMessage("You already collected your dailies!")
        }
    }
}
