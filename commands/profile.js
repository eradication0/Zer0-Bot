module.exports = (bot) => {
    bot.on('message', (message) => {
		if (message.content === '-profile' || message.content === '-prf') {
	        if (!profilecheck(message.author.id, message))
	            return;
	        let crd = db[message.author.id].credits
	        let exp = db[message.author.id].exp
	        let frc = db[message.author.id].fraction
	        let lvl = Math.trunc(Math.log(exp / 1) / Math.log(3));
	        let ncls = db[message.author.id].charclass
	        let m = "```markdown\n"
	        m += `#==========PROFILE==========#\n`
	        m += `+ Class: ${ncls}\n`
	        m += `+ fraction: ${frc}\n`
	        m += `+ Level: ${lvl}\n`
	        m += `+ Credits: ${crd}\n`
	        m += `+ Exp: ${exp}\n`
	        m += `#===========================#`
	        m += "```"
	        message.channel.sendMessage(m)
	    }
    })
}
