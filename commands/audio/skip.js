
module.exports = {
    name: "skip",
    aliases: ["sk"],
    description: "Skips current song.",
    async execute(client, Discord, message, args, audioPlayer) {

        if (!audioPlayer.instance){
            return message.reply("There is no audio player!");
        }

        audioPlayer.instance.stop();
    }
        
}