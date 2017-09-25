exports.run = function(message, db) {
	message.channel.send("2. COMMAND FILE: adding cookies...")
	db.cookies += 1;
	message.channel.send("3. COMMAND FILE: you now have **" + db.cookies + "** cookies")
}
