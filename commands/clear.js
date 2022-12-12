const config = require(__basedir + "/config.json");

module.exports = {
    name: "clear",
    description: "Clear up to a given amount of messages!",
    async execute(client, Discord, message, args){
        
        if(message.member.roles.cache.some(r => r.name === config.adminRole)){

            if(!args[0]) {
                const Embed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle("Error!")
                .setDescription("Please specify the amount of messages you want to clear:")
                .setFooter(config.prefix + "clear" + " <amount>");
        
                message.channel.send({embeds: [Embed] });
                return;
            } 
            
            if(isNaN(args[0])) {
                const Embed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle("Error!")
                .setDescription("Please enter a valid integer!")
        
                message.channel.send({embeds: [Embed] });
                return;
            }
            
            if(args[0] > 100) {
                const Embed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle("Error!")
                .setDescription("You cannot delete more than 100 messages!")
        
                message.channel.send({embeds: [Embed] });
                return;
            }

            if(args[0] < 1) {
                const Embed = new Discord.MessageEmbed()
                .setColor("#304281")
                .setTitle("Error!")
                .setDescription("You must delete at least 1 message!")
        
                message.channel.send({embeds: [Embed] });
                return;
            }

            args[0]++;
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.bulkDelete(messages);
            });


        } else {
            message.channel.send(config.noPermissionsMessage);
        }
        
    }
}