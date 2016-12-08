module.exports = (bot) => {
    bot.on('message', (message) => {
        if (message.content.startsWith('.ping')) {
            message.channel.sendMessage('pong')
        }
    })
}
