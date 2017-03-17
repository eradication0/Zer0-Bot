exports.run = function(bot, message, args, discord) {
	const fs = require('fs')
    var files = fs.readdirSync('./commands/')
	var m = ''
	for (var i in files) {
		m += "``+"
		m += files[i].slice(0,-3)
		m += "`` "
	}
	message.channel.sendMessage(m)
}
