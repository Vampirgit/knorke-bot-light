const config = require(__basedir + "/config.json");

module.exports = {
    name: "ping",
    cooldown: 10,
    description: "Ping Pong Ping Pong Ping Pong!",
    execute(client, Discord, message, args){   

        message.channel.send("pong!");     

    }
}