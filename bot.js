console.log ('<== STARTING BOT ==>')

const Discord = require('discord.js') //discord
const request = require('request') //jason request from website
const Twitter = require('twitter') //twitter api
const fs = require('fs') //filesystem
const jsonfile = require('jsonfile') //json write/reload
const rand = require('random-int') //number randomizer finally intuitive
const cronJob = require('cron').CronJob //scheduler

console.log ('node modules √')

const bot = new Discord.Client()
const dbpath = './db.json'


var db = require("./db.json")
var cred = require("./cred.json")
var client = new Twitter({
	consumer_key: cred.consumer,
	consumer_secret: cred.consumersecret,
	access_token_key: cred.twittertoken,
	access_token_secret: cred.twittertokensecret
})

console.log ('variables √')


bot.on('ready', () => {
	console.log('<== BOT STARTED ==>')
})

//DEBUG/ADMIN ---------------------------------------------

bot.on('message', message => {
	if (message.author.id === bot.user.id) return
	if (message.content.startsWith('-name'))
	{
		let m = `Hello ${message.content.slice(6)}`
		message.channel.sendMessage(m)
	}
	if (message.content.startsWith('.eval') && message.author.id === '64438454750031872' || message.content.startsWith('.eval') && message.author.id === '148764744231157760') {
		try {
			const com = eval(message.content.split(" ").slice(1).join(" "))
			message.channel.sendMessage('```\n' + com + '```')
		} catch(e) {
			message.channel.sendMessage('```\n' + e + '```')
		}
	}

	//OVERWATCH -------------------------------------------
	if (message.content.startsWith('-comp'))
	{
		let battletag = message.content.slice(7)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/competitive-play/allHeroes/'
		message.channel.sendMessage(url)
		message.channel.sendMessage('loading from DB...')
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body)
				body = body.replace(/-/g, "")
				body = JSON.parse(body)
				let kd = body.Eliminations
				let Winrate = body.GamesWon / body.GamesPlayed * 100
				let m = ''
				m += '```xl\n'
				m += `${battletag} "Competitive Profile"\n`
				m += `Comp Games Winrate: ${Winrate}%\n`
				m += `Comp Games Played: ${body.GamesPlayed}\n`
				m += `Comp Games Won: ${body.GamesWon}\n`
				m += `Eliminations: ${body.Eliminations}\n`
				m += `Kills/Death: ${body.EliminationsAverage}\n`
				m += `Damage: ${body.DamageDone}\n`
				m += `Heal: ${body.HealingDone}\n`
				m += `Medals: ${body.Medals}\n`
				m += `-Gold Medals: ${body.MedalsGold}\n`
				m += `-Silver Medals: ${body.MedalsSilver}\n`
				m += `-Bronze Medals: ${body.MedalsBronze}\n`
				m += '```'
				message.channel.sendMessage(m)
			}
		})
	}

	if (message.content.startsWith('-quick'))
	{
		let battletag = message.content.slice(7)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/quick-play/allHeroes/'
		message.channel.sendMessage(url)
		message.channel.sendMessage('loading from DB...')
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body)
				body = body.replace(/-/g, "")
				body = JSON.parse(body)
				let kd = body.Eliminations
				let Winrate = body.GamesWon / body.GamesPlayed * 100
				let m = ''
				m += '```xl\n'
				m += `${battletag} "Quick Profile"\n`
				m += `Quick Games Winrate: ${Winrate}%\n`
				m += `Quick Games Played: ${body.GamesPlayed}\n`
				m += `Quick Games Won: ${body.GamesWon}\n`
				m += `Time Played Quick: ${body.TimePlayed}\n`
				m += `Eliminations: ${body.Eliminations}\n`
				m += `Kills/Death: ${body.EliminationsAverage}\n`
				m += `Damage: ${body.DamageDone}\n`
				m += `Heal: ${body.HealingDone}\n`
				m += `Medals: ${body.Medals}\n`
				m += `-credits Medals: ${body.Medalscredits}\n`
				m += `-Silver Medals: ${body.MedalsSilver}\n`
				m += `-Bronze Medals: ${body.MedalsBronze}\n`
				m += '```'
				message.channel.sendMessage(m)
			}
		})
	}

	if (message.content.startsWith('-rawquick'))
	{
		let battletag = message.content.slice(10)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/quick-play/allHeroes/'
		message.channel.sendMessage(url)
		message.channel.sendMessage('loading from DB...')
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body)
				body = body.replace(/-/g, "")
				body = body.replace(/","/g, '",\n"')
				message.channel.sendMessage("```json\n" + body + "```")
			}
		})
	}

	if (message.content.startsWith('-rawcomp'))
	{
		let battletag = message.content.slice(10)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/competitive-play/allHeroes/'
		message.channel.sendMessage(url)
		message.channel.sendMessage('loading from DB...')
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body)
				body = body.replace(/-/g, "")
				body = body.replace(/","/g, '",\n"')
				message.channel.sendMessage("```json\n" + body + "```")
			}
		})
	}

	//TWITTER ----------------------------------------------
	if (message.content.startsWith('-tweet') && message.author.id === '64438454750031872' || message.content.startsWith('-tweet') && message.author.id === '148764744231157760'){
		let tweetbody = message.content.slice(7)
		if (tweetbody.length <= 140) {
			client.post('statuses/update', {status: tweetbody},  function(error, tweet, response) {
				message.channel.sendMessage('Sucessfully tweeted:"' + tweetbody + '" to: https://twitter.com/OverSwiss')
			})
		} else {
			message.channel.sendMessage("Your tweet is longer than 140 letters. Pls shorten your tweet.")
		}
	}
})

// RPG ---------------------------------------------------------
/*
<============================= DOKUMENTATION

<==EXP CURVE==>
x = 10 * (1.5 ^ y)
y = log(x/10) / log(1.5)
--
x = exp
y = lvl
--
.eval Math.log(EXP / 10) / Math.log(1.5)
.eval 10 * Math.pow(1.5, LVL)

<==Message Template==>
let m = "```xl\n"
m+= `"|---------"---------|"\n`
m+= ` > \n`
m+= ` > \n`
m+= `"|-------------------|"`
m+= "```"


*/


bot.on('message', message => {
	if (message.author.id === bot.user.id) return

	if (message.content === '-rpg') {
		let m = "```xl\n"
		m+= `"|---------RPG HELP---------|"\n`
		m+= ` > welcome to the Cyberpunk RPG\n`
		m+= ` > this is the help page\n`
		m+= ` > \n`
		m+= ` > Commands:\n`
		m+= ` > -create // "start your adventure!"\n`
		m+= ` > -profile, -prf // "checks your profile"\n`
		m+= ` > -inventory, -inv // "shows your inventory"\n`
		m+= ` > -daily, -dly // "collect your daily rewards"\n`
		m+= ` > \n`
		m+= ` > Infos:\n`
		m+= ` > Daily reset is everyday at 12:00 UTC+01:00\n`
		m+= `"|--------------------------|"`
		m+= "```"
	}
	///////////////////// FOR TESTING
	if (message.content === '-reset' && message.author.id === '64438454750031872' || message.content.startsWith('-reset') && message.author.id === '148764744231157760'){
		for(i in db){
			db[i].daily = 0
		}
		jsonfile.writeFile(dbpath, db)
		message.channel.sendMessage("daily reset!")
	}

	if (message.content === '-freeexp' && message.author.id === '64438454750031872' || message.content.startsWith('-freeexp') && message.author.id === '148764744231157760'){
		let dailyexp = rand(100, 1000)
		db[message.author.id].exp += dailyexp
		message.channel.sendMessage(`added ${dailyexp} exp`)
	}
	////////////////////////////////////

	// Daily reset
	var dailyreset = new cronJob({
		cronTime: '00 00 12 * * *',
		onTick: function reset(){
			for(i in db){
				db[i].daily = 0
			}
			console.log("reseted the db")
			jsonfile.writeFile(dbpath, db)
		},
		start: false,
		timeZone: "Europe/Berlin"
	})
	dailyreset.start()

	// daily
	if (message.content === '-daily' || message.content === '-dly'){
		if (db[message.author.id]) {
			if (db[message.author.id].daily === 0) {
				let dailyexp = rand(100, 1000)
				let dailycredits = rand(100, 1000)
				db[message.author.id].exp += dailyexp
				db[message.author.id].credits += dailycredits
				db[message.author.id].daily = 1
				jsonfile.writeFile(dbpath, db)
				let m = "```xl\n"
				m+= `"|---------Daily reward!---------|"\n`
				m+= ` > Credits: +${dailycredits}\n`
				m+= ` > Exp: +${dailyexp}\n`
				m+= `"|-------------------------------|"`
				m+= "```"
				message.channel.sendMessage(m)
			} else {
				message.channel.sendMessage("You already collected your dailies!")
			}
		} else {
			message.channel.sendMessage("No profile found. Use ``-create`` to create one.")
		}
	}
	// SHOW INVENTORY
	if (message.content === '-inventory' || message.content === '-inv' ){
		if (db[message.author.id]) {
			let m = '```xl\n'
			m += `"|---------INVENTORY---------|"\n`
			for(i in db[message.author.id].inventory){
				m += ` > `
				m += db[message.author.id].inventory[i]
				m += `\n`
			}
			m += '"|---------------------------|"```'
			message.channel.sendMessage(m)
		}
	}

	// SHOW CURRENT PROFILE
	if (message.content === '-profile' || message.content === '-prf'){
		if (db[message.author.id]) {
			let credits = db[message.author.id].credits
			let exp = db[message.author.id].exp
			let m = "```xl\n"
			m+= `"|---------PROFILE---------|"\n`
			m+= ` > Credits: ${credits}\n`
			m+= ` > Exp: ${exp}\n`
			m+= `"|-------------------------|"`
			m+= "```"
			message.channel.sendMessage(m)
		} else {
			message.channel.sendMessage("No profile found. Use ``-create`` to create one.")
		}
	}
	// CREATE NEW PROFILE
	if (message.content === '-create'){
		if (db[message.author.id]) {
			message.channel.sendMessage("You already have a profile")
		} else {
			db[message.author.id] = {"credits":0,"exp":0,"daily":0}
			jsonfile.writeFile(dbpath, db)
			message.channel.sendMessage("New profile created!")
			console.log ('new profile created!')
		}
	}
})
bot.login(cred.bottoken)
console.log ('login √')
