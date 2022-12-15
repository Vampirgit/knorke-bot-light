module.exports = {
    name: "stop",
    aliases: ["st"],
    description: "Stops the music player!",
    async execute(client, Discord, message, args, audioPlayer){
        
        if (!audioPlayer.instance){
            return message.reply("There is no audio player!");
        }

        audioPlayer.instance.destroy();
        
    }
}