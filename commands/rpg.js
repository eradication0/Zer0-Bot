exports.run = function(bot, message, args) {
	var req = require('../bot.js');
    if (message.content === '-rpg') {
        let m = "```markdown\n"
        m += `#==========RPG HELP==========#\n`
        m += `< welcome to the Overwatch RPG >\n`
        m += `+ this is the help page\n`
        m += `\n`
        m += `# Commands:\n`
        m += `+ -create, -crt "start your adventure!"\n`
        m += `+ -profile, -prf "checks your profile"\n`
        m += `+ -stats, -sts "checks your stats"\n`
        m += `+ -class, -cls "shows the classes availiable"\n`
        m += `+ -factions, -fac "shows the 3 selectable factions"\n`
        m += `+ -daily, -dly "collect your daily rewards"\n`
        m += `+ -inventory, -inv "shows your inventory"\n`
        m += `\n`
        m += `# Infos:\n`
        m += `+ daily reset is everyday at 12:00 UTC+01:00\n`
        m += `#============================#`
        m += "```"
        message.channel.sendMessage(m)
    }
}
