const config = require(__basedir + "/config.json");

const cooldowns = new Map();
var audioPlayer = { instance: undefined};

module.exports = {

    name: "messageCreate",

    async execute(client, Discord, message){
        if(!message.content.startsWith(config.prefix) || message.author.bot) return;
        const args = message.content.slice(config.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(a => a.aliases && a.aliases.includes(command));

        if (cmd != undefined) {
            try {
            
            // Cooldowns
            if (!cooldowns.has(cmd.name)) {
                cooldowns.set(cmd.name, new Discord.Collection());
            }
            const current_time = Date.now();
            const time_stamps = cooldowns.get(cmd.name);
            const cooldown_amount = (cmd.cooldown) * 1000;

            if (time_stamps.has(message.author.id)) {
                const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

                if (current_time < expiration_time) {
                    const time_left = (expiration_time - current_time) / 1000;

                    return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using this command again.`);
                }
            }

            time_stamps.set(message.author.id, current_time);
            setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);


            cmd.execute(client, Discord, message, args, audioPlayer);
            } catch (err) {
                message.reply("There was a critical error trying to execute the command!");
                console.log(err);
            }
        } else {
            const Embed = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle("Error!")
            .setDescription("Command does not exist!")

            message.channel.send({embeds: [Embed] });
        }
    }
}