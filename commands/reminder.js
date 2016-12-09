exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content.startsWith("-reminder")) {
        let m = "Your Reminder:\n<https://calendar.google.com/calendar/render?action=TEMPLATE&text="
        m += message.content.slice(10).replace(/\s/g, "+") + ">"
        message.channel.sendMessage(m)
    }
}
