const config = require(__basedir + "/config.json");
const token = require(__basedir + "/tokens.json");
const play = require('play-dl');
const { 
    joinVoiceChannel,
    AudioPlayerStatus,
    createAudioResource,
    createAudioPlayer,
 } = require('@discordjs/voice');
 const YouTube = require("discord-youtube-api");

module.exports = {
    name: "play",
    aliases: ["pl"],
    description: "Plays music directly from YouTube!",
    async execute(client, Discord, message, args, audioPlayer){
        console.log("command play");
        var video;
        var url;
        if (args.length === 0){
            return message.reply("Du hast keine URL oder Suchbegriff angegeben.");
        }

        if((/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm).test(args[0]) == true) {
            url = args[0];
        } else {
            try {
                video = await searchYouTubeAsync(args);
                url = video.url;
            }catch (err) {
                console.log(err);
                return message.reply("There was an error with the search!");
            }
        }
            
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You are not in a voice channel!');

        const connection = await joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            selfDeaf: false,
            selfMute: false,
            adapterCreator: message.guild.voiceAdapterCreator
        });
            
        if(connection){
            try {
                console.log('Joined voice');
                console.log("Playing with play-dl");
                let stream = await play.stream(url);
                let resource = createAudioResource(stream.stream, {
                    inputType: stream.type
                })

                audioPlayer.instance = createAudioPlayer();
                connection.subscribe(audioPlayer.instance);

                audioPlayer.instance.play(resource);

                if (video){
                    const Embed = new Discord.MessageEmbed()
                    .setColor("#304281")
                    .setTitle("Now Playing:")
                    .setDescription(video.title);
                    message.channel.send({embeds: [Embed] });
                }

                audioPlayer.instance.on(AudioPlayerStatus.Idle, () => connection.destroy());
                audioPlayer.instance.on("error", (err) => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }      
    }
}

async function searchYouTubeAsync(args) {
    const youtube = new YouTube(token.ytApiKey);
    var video = await youtube.searchVideos(args.join(' '));
    return video;
  }