exports.run = function(bot, message, args, discord) {
    if (message.author.id === '64438454750031872') {
        .addField('User' ,`${message.author.username} (${message.author.id})`)
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    }
}
