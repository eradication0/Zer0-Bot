exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        if (!profilecheck(message.author.id, message))
            return;
        let m = '```markdown\n'
        m += `#==========STATS==========#\n`
        for (i in req.db[message.author.id].stats) {
            m += `${i} : `
            m += req.db[message.author.id].stats[i]
            m += `\n`
        }
        m += '#=========================#```'
        message.channel.sendMessage(m)
}
