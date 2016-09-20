console.log ('<== STARTING BOT ==>');

const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const Twitter = require('twitter');
const fs = require('fs');
const jsonfile = require('jsonfile');
const cred = require("./cred.json");
var dbfile = './users.json';
var db = require("./users.json");


var client = new Twitter({
  consumer_key: cred.consumer,
  consumer_secret: cred.consumersecret,
  access_token_key: cred.twittertoken,
  access_token_secret: cred.twittertokensecret
});

console.log ('const √');


bot.on('ready', () => {
	console.log('<== BOT STARTED ==>');
});

//DEBUG/ADMIN ---------------------------------------------

bot.on('message', message => {
	if (message.author.id === bot.user.id) return;

	if (message.content.startsWith('-name'))
	{
		let m = `Hello ${message.content.slice(6)}`;
		message.channel.sendMessage(m);
	}

  if (message.content.startsWith('.eval') && message.author.id === '64438454750031872' || message.content.startsWith('.eval') && message.author.id === '148764744231157760') {
    try {
      const com = eval(message.content.split(" ").slice(1).join(" "));
      message.channel.sendMessage('```\n' + com + '```');
    } catch(e) {
      message.channel.sendMessage('```\n' + e + '```');
    }
  }

//OVERWATCH -------------------------------------------

	if (message.content.startsWith('-comp'))
	{
		let battletag = message.content.slice(7)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/competitive-play/allHeroes/';
		message.channel.sendMessage(url);
		message.channel.sendMessage('loading from DB...');
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body);
				body = body.replace(/-/g, "");
				body = JSON.parse(body);
				let kd = body.Eliminations;
				let Winrate = body.GamesWon / body.GamesPlayed * 100;
				let m = '';
				m += '```xl\n';
				m += `${battletag} "Competitive Profile"\n`;
				m += `Comp Games Winrate: ${Winrate}%\n`
				m += `Comp Games Played: ${body.GamesPlayed}\n`
				m += `Comp Games Won: ${body.GamesWon}\n`
				m += `Eliminations: ${body.Eliminations}\n`;
				m += `Kills/Death: ${body.EliminationsAverage}\n`
				m += `Damage: ${body.DamageDone}\n`
				m += `Heal: ${body.HealingDone}\n`
				m += `Medals: ${body.Medals}\n`
				m += `-Gold Medals: ${body.MedalsGold}\n`
				m += `-Silver Medals: ${body.MedalsSilver}\n`
				m += `-Bronze Medals: ${body.MedalsBronze}\n`
				m += '```'
				message.channel.sendMessage(m);
			}
		})
	}

   if (message.content.startsWith('-quick'))
	{
		let battletag = message.content.slice(7)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/quick-play/allHeroes/';
		message.channel.sendMessage(url);
		message.channel.sendMessage('loading from DB...');
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body);
				body = body.replace(/-/g, "");
				body = JSON.parse(body);
				let kd = body.Eliminations;
				let Winrate = body.GamesWon / body.GamesPlayed * 100;
				let m = '';
				m += '```xl\n';
				m += `${battletag} "Quick Profile"\n`;
				m += `Quick Games Winrate: ${Winrate}%\n`
				m += `Quick Games Played: ${body.GamesPlayed}\n`
				m += `Quick Games Won: ${body.GamesWon}\n`
        m += `Time Played Quick: ${body.TimePlayed}\n`
				m += `Eliminations: ${body.Eliminations}\n`;
				m += `Kills/Death: ${body.EliminationsAverage}\n`
				m += `Damage: ${body.DamageDone}\n`
				m += `Heal: ${body.HealingDone}\n`
				m += `Medals: ${body.Medals}\n`
				m += `-Gold Medals: ${body.MedalsGold}\n`
				m += `-Silver Medals: ${body.MedalsSilver}\n`
				m += `-Bronze Medals: ${body.MedalsBronze}\n`
				m += '```'
				message.channel.sendMessage(m);
			}
		})
	}

   if (message.content.startsWith('-rawquick'))
	{
		let battletag = message.content.slice(10)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/quick-play/allHeroes/';
		message.channel.sendMessage(url);
		message.channel.sendMessage('loading from DB...');
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body);
				body = body.replace(/-/g, "");
				body = body.replace(/","/g, '",\n"');
				message.channel.sendMessage("```json\n" + body + "```");
			}
		})
	}

	if (message.content.startsWith('-rawstats'))
	{
		let battletag = message.content.slice(10)
		let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#','-') + '/competitive-play/allHeroes/';
		message.channel.sendMessage(url);
		message.channel.sendMessage('loading from DB...');
		request({
			url: url,
			json: true
		}, function (error, response, body){
			if (!error && response.statusCode === 200){
				body = JSON.stringify(body);
				body = body.replace(/-/g, "");
				body = body.replace(/","/g, '",\n"');
				message.channel.sendMessage("```json\n" + body + "```");
			}
		})
	}

//TWITTER ----------------------------------------------

if (message.content.startsWith('-tweet') && message.author.id === '64438454750031872' || message.content.startsWith('-tweet') && message.author.id === '148764744231157760'){
  let tweetbody = message.content.slice(7);
  if (tweetbody.length <= 140) {
    client.post('statuses/update', {status: tweetbody},  function(error, tweet, response) {
      message.channel.sendMessage('Sucessfully tweeted:"' + tweetbody + '" to: https://twitter.com/OverSwiss');
    })
  } else {
    message.channel.sendMessage("Your tweet is longer than 140 letters. Pls shorten your tweet.");
  }
}
});

//RPG ---------------------------------------------------------
bot.on('message', message => {
	if (message.author.id === bot.user.id) return;
// SHOW CURRENT PROFILE
if (message.content === '-profile'){
  if (db[message.author.id]){
    let gold = db[message.author.id].gold;
    let exp = db[message.author.id].exp;
    let m = "```xl\n";
        m+= `"|---------PROFILE---------|"\n`;
        m+= `Gold: ${gold}\n`;
        m+= `exp: ${exp}\n`
        m+= `"|-------------------------|"`;
        m+= "```"
    message.channel.sendMessage(m);
  } else {
    message.channel.sendMessage("No Profile found");
  }
}
// CREATE NEW PROFILE
if (message.content === '-startrpg'){
  if (db[message.author.id]){
    message.channel.sendMessage("You already have a Profile");
  } else {
    db[message.author.id] = {"gold":0,"exp":0};
    jsonfile.writeFile(dbfile, db)
    message.channel.sendMessage("New Profile created!");
  }
}
});
bot.login(cred.bottoken);
console.log ('login √');
