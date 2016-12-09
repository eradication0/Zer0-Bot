exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content.startsWith('-comp')) {
        let battletag = message.content.slice(6)
        let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/competitive-play/allHeroes/'
        message.channel.sendMessage(url)
        message.channel.sendMessage('loading from DB...')
        req.request({
            url: url,
            json: true
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                body = JSON.stringify(body)
                body = body.replace(/-/g, "")
                body = JSON.parse(body)
                let kd = body.Eliminations
                let Winrate = body.GamesWon / body.GamesPlayed * 100
                let m = ''
                m += '```ruby\n'
                m += `${battletag} "Competitive Profile"\n`
                m += `Comp Games Winrate: ${Winrate}%\n`
                m += `Comp Games Played: ${body.GamesPlayed}\n`
                m += `Comp Games Won: ${body.GamesWon}\n`
                m += `Eliminations: ${body.Eliminations}\n`
                m += `Kills/Death: ${body.EliminationsAverage}\n`
                m += `Damage: ${body.DamageDone}\n`
                m += `Heal: ${body.HealingDone}\n`
                m += `Medals: ${body.Medals}\n`
                m += `-Gold Medals: ${body.MedalsGold}\n`
                m += `-Silver Medals: ${body.MedalsSilver}\n`
                m += `-Bronze Medals: ${body.MedalsBronze}\n`
                m += '```'
                message.channel.sendMessage(m)
            }
        })
    }
}
