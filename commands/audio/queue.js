let { queue } = require('../../utils/audio/Queue');
const { EmbedBuilder } = require('discord.js');
const play = require('play-dl');

module.exports = {
    name: "queue",
    aliases: ["qe"],
    description: "Lists all songs in the queue!",
    async execute(client, Discord, message, args, audioPlayer){
        
        let serverQueue = queue.get(message.guild.id);
        if (!serverQueue){
            return message.reply("Ich bin in keinem Voicechannel!");
        }

        const Embed = new EmbedBuilder()
        .setColor("#304281")
        .setTitle("Warteschlange")
        .setDescription("Alle Songs in der Warteschlange")
        .setTimestamp()

        if(serverQueue.songs.length <= 1) {
            Embed.addFields({name: "Keine Songs", value: "Die Warteschlange ist leer!"})
        } else if(serverQueue.songs.length >= 2){
            for(i = 1; i < serverQueue.songs.length; i++) {
                let video = await play.search(serverQueue.songs[i], {source: {youtube: "video"}, limit: 1});
                Embed.addFields({name: (i).toString(), value: video[0].title + " - " + video[0].durationRaw})
            }
        }

        message.channel.send({ embeds: [Embed] });
        
    }
}