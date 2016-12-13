exports.run = function(bot, message, args) {
    var req = require('../bot.js')
    var files = req.fs.readdirSync('./commands/')
	var m = ''
	for (var i in files) {
		m += "``-"
		m += files[i].slice(0,-3)
		m += "`` "
	}
	message.channel.sendMessage(m);
}
