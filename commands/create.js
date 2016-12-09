exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content === '-create' || message.content === '-crt') {
        if (!req.db[message.author.id]) {
            req.db[message.author.id] = req.newuser
            req.fs.writeFile(req.dbpath, JSON.stringify(req.db))
            message.channel.sendMessage("New profile created!")
            console.log('new profile created!')
        } else {
            message.channel.sendMessage('You already have a profile.')
        }
    }
}
