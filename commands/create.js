module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-create' || message.content === '-crt') {
	        if (!db[message.author.id]) {
	            db[message.author.id] = newuser
	            fs.writeFile(dbpath, JSON.stringify(db))
	            message.channel.sendMessage("New profile created!")
	            console.log('new profile created!')
	        } else {
	            message.channel.sendMessage('You already have a profile.')
	        }
	    }
    })
}
