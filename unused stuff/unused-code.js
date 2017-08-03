profilecheck = (authorid, msg) => {
	if (db[authorid]) {
		return true
	} else {
		msg.channel.send("You don't have a profile. Type ``-create`` to create one.")
		return false
	}
},

    cronJob = require('cron').CronJob,

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

dailyreset.start()


	admin = require("firebase-admin"),
	serviceAccount = require("./firebase.json"),
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

    request = require('request'),

    twitter = require('twitter'),
    client = new twitter({consumer_key: cred.consumer, consumer_secret: cred.consumersecret, access_token_key: cred.twittertoken, access_token_secret: cred.twittertokensecret}),


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
