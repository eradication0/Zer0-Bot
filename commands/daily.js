module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-daily' || message.content === '-dly') {
	        if (!profilecheck(message.author.id, message))
	            return;

	        if (db[message.author.id].daily === 0) {
	            let dailyexp = rand(100, 1000)
	            let dailycredits = rand(100, 1000)
	            db[message.author.id].exp += dailyexp
	            db[message.author.id].credits += dailycredits
	            db[message.author.id].daily = 1
	            jsonfile.writeFile(dbpath, db)
	            let m = "```markdown\n"
	            m += `#==========DAILY REWARD!==========#\n`
	            m += `# Credits: +${dailycredits}\n`
	            m += `# Exp: +${dailyexp}\n`
	            m += `#=================================#`
	            m += "```"
	            message.channel.sendMessage(m)
	        } else {
	            message.channel.sendMessage("You already collected your dailies!")
	        }
	    }
    })
}
