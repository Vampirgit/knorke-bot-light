const { ClientUser } = require("discord.js");

const config = require(__basedir + "/config.json");

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "List all commands!",
    execute(client, Discord, message, args){   

        const Embed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle("Commands:");

        client.commands.sorted((a, b) => a.name.localeCompare(b.name)).each(command =>  
            (!command.aliases || command.aliases.length == 0) 
            ? Embed.addField(name = config.prefix + command.name, value = command.description) 
            : Embed.addField(name = config.prefix + command.name + ` (aliases: ${command.aliases.map(x => config.prefix + x).toString()})`, value = command.description)
        );

        message.channel.send({embeds: [Embed] });

    }
}