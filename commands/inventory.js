module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-inventory' || message.content === '-inv') {
	        if (!profilecheck(message.author.id, message))
	            return;
	        let m = '```markdown\n'
	        m += `#==========INVENTORY==========#\n`
	        for (i in db[message.author.id].inventory) {
	            m += `${i}. `
	            m += db[message.author.id].inventory[i]
	            m += `\n`
	        }
	        m += '#=============================#```'
	        message.channel.sendMessage(m)
	    }
    })
}
