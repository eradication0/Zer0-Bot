exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        if (!profilecheck(message.author.id, message))
            return;
        let m = '```markdown\n'
        m += `#==========INVENTORY==========#\n`
        for (i in req.db[message.author.id].inventory) {
            m += `${i}. `
            m += req.db[message.author.id].inventory[i]
            m += `\n`
        }
        m += '#=============================#```'
        message.channel.sendMessage(m)
}
