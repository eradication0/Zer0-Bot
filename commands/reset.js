module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-reset' && message.author.id === '64438454750031872' || message.content.startsWith('-reset') && message.author.id === '148764744231157760') {
	        for (i in db) {
	            db[i].daily = 0
	        }
	        message.channel.sendMessage("daily reset!")
	    }
    })
}
