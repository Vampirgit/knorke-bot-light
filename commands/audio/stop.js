let { queue } = require('../../utils/audio/Queue');

module.exports = {
    name: "stop",
    aliases: ["st"],
    description: "Stops the music player!",
    async execute(client, Discord, message, args, audioPlayer){
        
        let serverQueue = queue.get(message.guild.id);
        if (!serverQueue.connection){
            return message.reply("There is no audio player!");
        }

        serverQueue.connection.destroy();
        queue.delete(message.guild.id);
        
    }
}