console.log('<== STARTING BOT ==>');

// NPM PACKAGES
var Discord = require('discord.js'),
    request = require('request'),
    Twitter = require('twitter'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    rand = require('random-int'),
    cronJob = require('cron').CronJob,

    // PATHS
    dbpath = './db.json',
    clspath = './classes.json',
    frcpath = './fractions.json',
    botpath = './bot.js',
    cmdpath = './commands.js',

    // GLOBAL VARS
    db = require("./db.json"),
    cls = require("./classes.json"),
    cred = require("./cred.json"),
    shop = require("./shops.json"),
    newuser = require("./newuser.json"),
    frc = require("./fractions.json"),

    // INIT DISCORD
    bot = new Discord.Client(),

    // INIT TWITTER
    client = new Twitter({consumer_key: cred.consumer, consumer_secret: cred.consumersecret, access_token_key: cred.twittertoken, access_token_secret: cred.twittertokensecret}),

    // INIT DAILY RESET
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

    // FUNCTIONS
    profilecheck = (authorid, msg) => {
        if (db[authorid]) {
            return true
        } else {
            msg.channel.sendMessage("You don't have a profile. Type ``-create`` to create one.")
            return false
        }
    };
console.log('Setup √')

var p1 = 0
var p2 = 0

console.log('Loading Commands...')

// COMMANDS
fs.readdirSync('./commands').forEach(function(file) {
    console.log('CMD loaded: ' + file)
    var funcname = require('./commands/' + file);
    funcname(bot)
});

console.log('Commands loaded √')

jsonfile.spaces = 2
dailyreset.start()

bot.on('ready', () => {
    console.log('<== BOT STARTED ==>')
})

bot.on('message', (message) => {
	if (message.author.id === bot.user.id) return
})
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

bot.login(cred.bottoken)
console.log('login √')
console.log('Last save: ' + fs.statSync(botpath).mtime)
