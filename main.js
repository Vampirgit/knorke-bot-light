global.__basedir = __dirname;

const Discord = require("discord.js");
const config = require("./config.json");
const tokens = require("./tokens.json");
const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
]});

client.commands = new Discord.Collection();

require("./managers/CommandManager")(client, Discord);
require("./managers/EventManager")(client, Discord);

// (!) last line:
client.login(tokens.token);