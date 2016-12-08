module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content.startsWith('-shop')) {
	        if (!profilecheck(message.author.id, message))
	            return
	        if (db[message.author.id].charclass !== "none") {
	            let pickedclass = db[message.author.id].charclass
	            let m = "```markdown\n"
	            m += `#==========${pickedclass.toUpperCase()} SHOP==========#\n`
	            m += `# availiable items:\n`
	            for (i in shop[pickedclass]) {
	                m += `${i}. ${shop[pickedclass][i]} \n`
	            }
	            m += `#========================#`
	            m += "```"
	            message.channel.sendMessage(m)
	        } else {
	            message.channel.sendMessage("You have to choose a class first. Type ``-class`` to see all classes.")
	        }
	    }
    })
}
