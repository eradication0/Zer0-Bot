exports.run = function(bot, message, args) {
    if (message.author.id === '64438454750031872') {
        message.channel.sendMessage('shutting bot down')
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    }
}
