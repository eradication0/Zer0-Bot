exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        let battletag = message.content.slice(10)
        let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/quick-play/allHeroes/'
        message.channel.sendMessage(url)
        message.channel.sendMessage('loading from DB...')
        req.request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                body = JSON.stringify(body)
                body = body.replace(/-/g, "")
                body = body.replace(/","/g, '",\n"')
                message.channel.sendMessage("```json\n" + body + "```")
            }
        })
}
