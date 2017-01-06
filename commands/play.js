exports.run = function(bot, message, args) {
  const audioFolder = './audio/';
  const rand = require('random-int')
  const fs = require('fs');
  var audioFiles = fs.readdirSync(audioFolder)
  var randomPlay = rand(0, audioFiles.length)

  bot.channels.get(message.member.voiceChannelID).join()
  .then(connection => {
   const dispatcher = connection.playFile('./audio/' + audioFiles[randomPlay]);
  })
}
