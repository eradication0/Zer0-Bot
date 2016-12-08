module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content.startsWith('-tweet') && message.author.id === '64438454750031872' || message.content.startsWith('-tweet') && message.author.id === '148764744231157760') {
	        let tweetbody = message.cleanContent.slice(7)
	        if (tweetbody.length <= 140) {
	            client.post('statuses/update', {
	                status: tweetbody
	            }, function(error, tweet, response) {
	                message.channel.sendMessage('Sucessfully tweeted:"' + tweetbody + '" to: https://twitter.com/OverSwiss')
	            })
	        } else {
	            message.channel.sendMessage("Your tweet is longer than 140 letters. Pls shorten your tweet.")
	        }
	    }
    })
}
