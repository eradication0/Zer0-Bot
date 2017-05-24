console.log('<== STARTING SELF BOT ==>');

	const discord = require('discord.js');
	const bot = new discord.Client();

	bot.on('message', message => {
	  if(message.author !== bot.user) return;

	  if (message.cleanContent.startsWith("💻"))
	  try {
		  const com = eval(message.content.slice(2))
		  message.channel.sendMessage(":white_check_mark: " + com)
	  } catch (err) {
		  message.channel.sendMessage(":x:" + err)
	  }

	  if (message.content.startsWith(":cookie:")) {
	  	console.log("test")
	  }
	});

console.log('<== ONLINE ==>');

	bot.login("")
