exports.run = function(bot, message, args, discord) {

	let answers = [
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes definitely",
		"You may rely on it",
		"As I see it",
		"yes",
		"Most likely",
		"Outlook good",
		"Yes",
		"Signs point to yes",
		"Reply hazy try again",
		"Ask again later",
		"Better not tell you now",
		"Cannot predict now",
		"Concentrate and ask again",
		"Don't count on it",
		"My reply is no",
		"sources say no",
		"Outlook not so good",
		"Very doubtful"
	]
	var item = answers[Math.floor(Math.random() * answers.length)];
	message.channel.sendMessage("** ( ‾ʖ̫‾)つ──☆*:・ﾟ **" + item)
}
