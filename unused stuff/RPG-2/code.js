const enemynames = fs.readFileSync('./enemynames.txt').toString().split("\n");
const db = require('./rpg.json')
const def = require('./rpgDef.json')
const dbPath = './rpg.json'

// db backup
dbBackup = () => {
	setTimeout(function() {
		fs.writeFileSync(dbPath, JSON.stringify(db))
		dbBackup()
		let time = new Date()
		console.log("RPG DB Backuped √ " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() + " " + time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear())
	}, 600000); //backup interval
}
dbBackup()

// RPG STUFF --------------------
let player = message.author.id


// new encounter
expChange = (exp) => {
	let currentlvl = content.lvl
	content.lvl = Math.floor(Math.log(Math.pow(exp, 2)) / Math.log(10))
	content.exp += exp
	if (content.exp <= 0) {
		content.exp = 0
	}
	if (currentlvl > content.lvl) {
		return -1
	} else if (currentlvl < content.lvl) {
		let lvlamount = content.lvl - currentlvl
		content.maxhealth += lvlamount * 10 + content.lvl ^ 2
		content.maxshield += lvlamount * 5 + content.lvl ^ 2
		content.health = content.maxhealth
		content.shield = content.maxshield
		return 1
	} else {
		return 0
	}
}
newEncounter = () => {
	content.shield = content.maxshield

	// generate enemy
	let lvl = rand(content.lvl - 4, content.lvl + 4)
	if (lvl <= 0) {
		lvl = 1
	}
	let atk = 4 + rand(Math.pow(lvl, 1.2), Math.pow(lvl, 1.3))
	let hp = 9 + rand(Math.pow(lvl, 2), Math.pow(lvl, 2.2))
	let def = 4 + rand(Math.pow(lvl, 1.2), Math.pow(lvl, 1.3))
	let name = enemynames[rand(-1, enemynames.length)]
	// put in db
	content.encounter.name = name
	content.encounter.attack = atk
	content.encounter.defense = def
	content.encounter.health = hp
	content.encounter.maxhealth = hp
	content.encounter.lvl = lvl

	// output to char
	embed.setTitle("New Encounter").setColor(c_special).setURL(message.author.avatarURL).addField("🏷 Name", name, true).addField('⭐ Level', lvl, true).addField('\u200b', '\u200b', true).addField("🗡 Attack", atk, true).addField("🛡 Defense", def, true).addField("💕 Health", hp + " / " + hp, true)
	message.channel.send({embed})
}

//check for custom nickname
if (player.startsWith("!")) {
	player = player.slice(1)
}
let content = db[player]

// RPG START
if (message.content.startsWith("++start")) {

	//check if user already have a profile
	if (db[player]) {
		embed.setTitle("You already have a profile.")

	} else {
		//create profile
		db[player] = {}
		//profile stats
		db[player].lvl = 1;
		db[player].exp = 1;
		db[player].credits = 1000;
		//dynamic stats
		db[player].health = 100;
		db[player].maxhealth = 100;
		db[player].shield = 10;
		db[player].maxshield = 10;
		//multiplier stats
		db[player].strength = 1;
		db[player].defense = 1;
		db[player].evasion = 1;
		db[player].class = "rookie";
		db[player].weapon = "Glock-19";
		db[player].damage = def.weapons[db[player].weapon];
		//enemy tracker
		db[player].encounter = {}
		db[player].encounter.lvl = 0
		db[player].encounter.name = "none"
		db[player].encounter.attack = 0
		db[player].encounter.defense = 0
		db[player].encounter.health = 0
		db[player].encounter.maxhealth = 0

		embed.setTitle("Profile created!").setColor(c_good)
	}
	message.channel.send({embed})
	return
}

// RPG MEMBER AREA
if (message.content.startsWith("++")) {
	if (!db[player]) {
		embed.setTitle("You dont have a profile. Please use ``++start``").setColor(c_warning)
		message.channel.send({embed})
		return
	}
}

if (message.content === "++rpg") {
	embed.setTitle("RPG Help").setURL(message.author.avatarURL).setDescription("This is a small RPG made by Zer0 in a Cyberpunk universe, currently under development.").addField("++rpg", "Displays this message").addField("++start", "Creates a profile").addField("++profile | ++p", "Shows your profile").addField("++attack | ++a", "Attacks the enemy. If the enemy is not present, it will generate a new encounter").addField("++heal | ++h", "Heals 25hp for 100 credits")
	message.channel.send({embed})
}
// RPG Profile
if (message.content.startsWith("++profile") || message.content.startsWith("++p")) {
	embed.setTitle(message.author.username + "'s Profile").setColor(c_note).setURL(message.author.avatarURL).addField("⭐ Level", content.lvl, true).addField("✨ Experience", content.exp, true).addField("💳 Credits", content.credits, true).addField("💕 Health", content.health + " / " + content.maxhealth, true).addField("💠 Shield", content.shield + " / " + content.maxshield, true).addField("Str/Eva/Def", content.strength + " / " + content.evasion + " / " + content.defense, true).addField("🏷 Class", content.class, false).addField("🔫 Weapon", content.weapon, false)
	message.channel.send({embed})
	return
}

// RPG Attack
if (message.content.startsWith("++attack") || message.content.startsWith("++a")) {
	if (content.encounter.health <= 0) {
		newEncounter()
		return
	} else {
		let dmgGiven = content.damage + rand(Math.pow(content.strength, 1.2), Math.pow(content.strength, 1.25))
		let dmgTaken = rand(content.encounter.attack, Math.pow(content.encounter.attack, 1.2)) - rand(Math.pow(content.defense, 1.2), Math.pow(content.defense, 1.25))
		let currentShield = content.shield
		let shieldDifference = content.shield - dmgTaken
		if (shieldDifference < 0) {
			content.shield = 0
			content.health += shieldDifference
		} else {
			content.shield += dmgTaken * -1
		}
		content.encounter.health += dmgGiven * -1
		if (content.health <= 0) {

			// died
			let explost = Math.floor(content.exp / 100 * 2) * -1 //loose 2%
			content.health = Math.floor(content.maxhealth / 100 * 50) //get 50% health back
			if (expChange(explost) === -1 && explos > 0) {
				embed.addField("⭐ You lost a level", "Current level " + content.lvl)
			}
			embed.setTitle("✝ You died!").setColor(c_bad).setURL(message.author.avatarURL).addField("✨ You lost 2% of your exp", "💕 You got 50% of your health back")

		} else if (content.encounter.health <= 0) {

			// enemy killed
			let creditsgot = content.encounter.maxhealth + content.encounter.defense * 2 + content.encounter.attack * 2 + content.encounter.lvl * 5
			content.credits += creditsgot
			let expgot = rand(Math.pow(content.encounter.lvl + 10, 1.2), Math.pow(content.encounter.lvl + 10, 1.3))
			embed.setTitle("You killed " + content.encounter.name).setColor(c_good).setURL(message.author.avatarURL).addField("💥 Damage given " + dmgGiven, "👽 Health " + content.encounter.health + " / " + content.encounter.maxhealth).addField("🗡 Damage took " + dmgTaken, "💠 Shield " + content.shield + " / " + content.maxshield + " | 💕 Health " + content.health + " / " + content.maxhealth).addField("✨ Experience +" + expgot, "💳 Credits +" + creditsgot)
			if (expChange(expgot) === 1) {
				embed.addField("⭐ You leveld up!", "Current level " + content.lvl)
			}
		} else {

			//normal attack
			embed.setTitle("Attacked " + content.encounter.name).setColor(c_special).setURL(message.author.avatarURL).addField("🔫 Damage given " + dmgGiven, "👽 Health " + content.encounter.health + " / " + content.encounter.maxhealth).addField("🗡 Damage took " + dmgTaken, "💠 Shield " + content.shield + " / " + content.maxshield + " | 💕 Health " + content.health + " / " + content.maxhealth)
		}
		message.channel.send({embed})
	}
}

if (message.content.startsWith("++heal") || message.content.startsWith("++h")) {
	let cost = 100
	let heal = 25
	if (content.credits < cost) {

		// not enough credits
		embed.setTitle("Not enough Credits, you need at least 💳" + cost).setColor(c_bad)
	} else if (content.health === content.maxhealth) {

		// full life
		embed.setTitle("You are already full 💕 Health").setColor(c_warning)
	} else {

		// heal
		content.health += heal
		if (content.health > content.maxhealth) {
			heal = content.maxhealth - content.health
			content.health = content.maxhealth
		}
		embed.setTitle("Healed! (💕 +" + heal + ") " + content.health + " / " + content.maxhealth).setColor(c_good).setDescription("Cost: 💳 " + cost)
	}
	message.channel.send({embed})
}
