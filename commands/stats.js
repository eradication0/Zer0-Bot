module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-stats' || message.content === '-sts') {
	        if (!profilecheck(message.author.id, message))
	            return;
	        let m = '```markdown\n'
	        m += `#==========STATS==========#\n`
	        for (i in db[message.author.id].stats) {
	            m += `${i} : `
	            m += db[message.author.id].stats[i]
	            m += `\n`
	        }
	        m += '#=========================#```'
	        message.channel.sendMessage(m)
	    }
    })
}
