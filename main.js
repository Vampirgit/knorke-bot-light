global.__basedir = __dirname;

const Discord = require("discord.js");
const config = require("./config.json");
const tokens = require("./tokens.json");

const client = new Discord.Client({intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES, 
    Discord.Intents.FLAGS.GUILD_VOICE_STATES, 
    Discord.Intents.FLAGS.MESSAGE_CONTENT,

]});

client.commands = new Discord.Collection();

require("./managers/CommandManager")(client, Discord);
require("./managers/EventManager")(client, Discord);

// (!) last line:
client.login(tokens.token);