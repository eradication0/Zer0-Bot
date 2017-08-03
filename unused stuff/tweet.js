exports.run = function(bot, message, args) {
	var req = require('../bot.js');
        let tweetbody = message.cleanContent.slice(7)
        if (tweetbody.length <= 140) {
            req.client.post('statuses/update', {
                status: tweetbody
            }, function(error, tweet, response) {
                message.channel.send('Sucessfully tweeted:"' + tweetbody + '" to: https://twitter.com/OverSwiss')
            })
        } else {
            message.channel.send("Your tweet is longer than 140 letters. Pls shorten your tweet.")
        }
}
