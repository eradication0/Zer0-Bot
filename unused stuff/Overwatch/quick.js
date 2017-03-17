exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        let battletag = message.content.slice(7)
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
                body = JSON.parse(body)
                let kd = body.Eliminations
                let Winrate = body.GamesWon / body.GamesPlayed * 100
                let m = ''
                m += '```ruby\n'
                m += `${battletag} "Quick Profile"\n`
                m += `Quick Games Winrate: ${Winrate}%\n`
                m += `Quick Games Played: ${body.GamesPlayed}\n`
                m += `Quick Games Won: ${body.GamesWon}\n`
                m += `Time Played Quick: ${body.TimePlayed}\n`
                m += `Eliminations: ${body.Eliminations}\n`
                m += `Kills/Death: ${body.EliminationsAverage}\n`
                m += `Damage: ${body.DamageDone}\n`
                m += `Heal: ${body.HealingDone}\n`
                m += `Medals: ${body.Medals}\n`
                m += `-credits Medals: ${body.Medalscredits}\n`
                m += `-Silver Medals: ${body.MedalsSilver}\n`
                m += `-Bronze Medals: ${body.MedalsBronze}\n`
                m += '```'
                message.channel.sendMessage(m)
            }
        })
}
