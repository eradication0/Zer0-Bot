console.log('<== STARTING BOT ==>');

// Vars
var discord = require('discord.js'),
    request = require('request'),
	admin = require("firebase-admin"),
    twitter = require('twitter'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    rand = require('random-int'),
    cronJob = require('cron').CronJob,
    botpath = './bot.js',
    cmdpath = './commands.js',
	serviceAccount = require("./firebase.json"),
    cred = require("./cred.json"),
    bot = new discord.Client(),
    time = Date.now(),
    client = new twitter({consumer_key: cred.consumer, consumer_secret: cred.consumersecret, access_token_key: cred.twittertoken, access_token_secret: cred.twittertokensecret}),

    dailyreset = new cronJob({
        cronTime: '00 00 12 * * *',
        onTick: function reset() {
            for (i in db) {
                db[i].daily = 0
            }
            console.log("reseted the db")
            jsonfile.writeFile(dbpath, db)
        },
        start: false,
        timeZone: "Europe/Berlin"
    }),

// Functions
    profilecheck = (authorid, msg) => {
        if (db[authorid]) {
            return true
        } else {
            msg.channel.sendMessage("You don't have a profile. Type ``-create`` to create one.")
            return false
        }
    },

    discordLog = (msg) => {
        bot.channels.get('256700486508347392').sendMessage(msg)
    },

    fileLog = (e) => {
        fs.appendFile('./log.txt', e, (err) => {})
    },

    getDateTime = () => {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return  +  + day + "." + month + "." + year + " - " + hour + ":" + min + ":" + sec + "s";
    }

console.log('Setup √')

// Initialisation
jsonfile.spaces = 2
dailyreset.start()

// Firebase
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");

ref.once("value", function(snapshot) {
	discordLog(snapshot.val())
})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://overswissrpg.firebaseio.com"
})

// listeners
bot.on('message', (message) => {
    if (message.isMentioned(bot.user.id)) {
		let msg = "```markdown\n"
		msg += `< BOT GOT MENTIONED > \n* User: ${message.author.username} (${message.author.id})\n* Server : ${message.guild.name}\n* Channel: ${message.channel.name}\n* Message: ${message.cleanContent}`
		msg += "```"
		discordLog(msg);
    }
    if (message.author.id === bot.user.id) return
    if (!message.content.startsWith(cred.prefix)) return

    const args = message.content.split(' ');
    const command = args.shift().slice(cred.prefix.length);

    try {
        let cmdFile = require('./commands/' + command);
        cmdFile.run(bot, message, args);
    } catch (e) {
    	fileLog(e + '\n');
    }
})

// Ready
bot.on('ready', () => {

    let msg = "```markdown\n"
    msg += `#=== BOOT TIME STATISTICS ===#\n`
    msg += `+ Time:      ${getDateTime()}\n`
    msg += `+ Users:     ${bot.users.size}\n`
    msg += `+ Servers:   ${bot.guilds.size}\n`
    msg += `+ Channels:  ${bot.channels.size}\n`
    msg += "```"
    discordLog(msg);
});

//Export needed variables
exports.client = client;
exports.request = request;
exports.rand = rand;
exports.profilecheck = profilecheck;
exports.jsonfile = jsonfile;
exports.fs = fs;

bot.login(cred.bottoken)
console.log('<== BOT ONLINE ==>')

/*
### EXP CURVE ########################
EQUASIONS
x = 1 * (3 ^ y)
y = log(x/1) / log(3)
DEFINITION
x = exp
y = lvl
COMMANDS
.eval Math.log(EXP / 10) / Math.log(1.5)
.eval 10 * Math.pow(1.5, LVL)
### END CURVE #######################
*/
