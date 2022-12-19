const config = require(__basedir + "/config.json");
const token = require(__basedir + "/tokens.json");
const play = require('play-dl');
const { EmbedBuilder } = require('discord.js');

let { queue } = require('../../utils/audio/Queue');

const {
    joinVoiceChannel,
    AudioPlayerStatus,
    createAudioResource,
    createAudioPlayer,
} = require('@discordjs/voice');

module.exports = {
    name: "play",
    aliases: ["pl"],
    description: "Plays music directly from YouTube!",
    async execute(client, Discord, message, args, audioPlayer) {

        const serverQueue = queue.get(message.guild.id);

        console.log("command play");
        var video;
        var url;
        if (args.length === 0) {
            return message.reply("Du hast keine URL oder Suchbegriff angegeben.");
        }

        if ((/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/gm).test(args[0]) == true) {
            url = args[0];
        } else {
            try {
                video = await play.search(args.toString(), {source: {youtube: "video"}, limit: 1});
                url = video[0].url;

            } catch (err) {
                console.log(err);
                return message.reply("Es gab einen Fehler während der Suche!");
            }
        }

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Du bist in keinem Voicechannel!');

        const connection = await joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            selfDeaf: false,
            selfMute: false,
            adapterCreator: message.guild.voiceAdapterCreator
        });

        if (connection) {
            try {
                console.log('Joined voice');
                console.log("Playing with play-dl");

                if(!serverQueue) {
                    const queueConst = {
                        voiceChanne: voiceChannel.id,
                        connection: null,
                        songs: [],
                        audioPlayer: null,
                        playing: true
                    };

                    queue.set(message.guild.id, queueConst);
                    queueConst.songs.push(url);
                    queueConst.connection = connection;
                    
                    audioPlayer.instance = createAudioPlayer();
                    connection.subscribe(audioPlayer.instance);

                    queueConst.audioPlayer = audioPlayer.instance;
                    await playSong(message.guild, queueConst.songs[0], Discord, message.channel);
                } else {
                    serverQueue.songs.push(url)
                    const video = await play.search(url, {source: {youtube: "video"}, limit: 1});
                    return message.channel.send(`${video[0].title} wurde der Warteschlange hinzugefügt.`)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}

async function playSong(guild, url, Discord, channel) {
    const serverQueue = queue.get(guild.id);

    if(!url) {
        try{
            serverQueue.connection.destroy();
        } catch(e) {
            console.log(e);
        }
        queue.delete(guild.id);
        return;
    }

    const video = await play.search(url, {source: {youtube: "video"}, limit: 1});

    let stream = await play.stream(url);
    let resource = createAudioResource(stream.stream, {
        inputType: stream.type
    })
    const dispatch = serverQueue.audioPlayer.play(resource);

    const Embed = new EmbedBuilder()
        .setColor("#304281")
        .setTitle("Now Playing")
        .setURL(video[0].url)
        .setDescription(video[0].title)
        .setThumbnail(video[0].thumbnails[0].url)
        .addFields(
            {name: "Views", value: video[0].views.toString()},
            {name: "Länge", value: video[0].durationRaw},
        )
        .setTimestamp()
   channel.send({ embeds: [Embed] });

    serverQueue.audioPlayer.on(AudioPlayerStatus.Idle, () => {
        serverQueue.songs.shift();
        playSong(guild, serverQueue.songs[0], Discord, channel);
    });

    serverQueue.audioPlayer.on("error", (err) => console.log(err));
}