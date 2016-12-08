module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-freeexp' && message.author.id === '64438454750031872' || message.content.startsWith('-freeexp') && message.author.id === '148764744231157760') {
	        let dailyexp = rand(100, 1000)
	        db[message.author.id].exp += dailyexp
	        message.channel.sendMessage(`added ${dailyexp} exp`)
	    }
    })
}
