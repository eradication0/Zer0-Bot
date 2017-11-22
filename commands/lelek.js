exports.run = function(bot, message, args, discord, settings, inv) {
	const rand = require('random-int')
	const joke = require('../joke.json')
	let subjekt = ""
	if (args.length === 0) {
		let randSubjekt = rand(0,joke.subjekt.length)
		randSubjekt += -1
		subjekt = joke.subjekt[randSubjekt]
	} else {
		subjekt = args.join(" ")
	}

	let randPraedikat = rand(0,joke.praedikat.length)
	let praedikat = joke.praedikat[randPraedikat]

	let randAdverb = rand(0,joke.adverb.length)
	let adverb = joke.adverb[randAdverb]

	let randObjekt = rand(0,joke.objekt.length)
	let objekt = joke.objekt[randObjekt]

	let randAttribut = rand(0,joke.attribut.length)
	let attribut = joke.attribut[randAttribut]

	let msg = ""
	setTimeout(function () {
		msg = subjekt+" "+praedikat+" "+adverb+" "+objekt+" "+attribut+"."
		message.channel.send(msg);
	}, 5);

}
