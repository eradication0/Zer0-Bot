module.exports = (bot) => {
    bot.on('message', (message) => {
	    if (message.content.startsWith("-reminder")) {
	        let m = "Your Reminder:\n<https://calendar.google.com/calendar/render?action=TEMPLATE&text="
	        m += message.content.slice(10).replace(/\s/g, "+") + ">"
	        message.channel.sendMessage(m)
	    }
	})
}
