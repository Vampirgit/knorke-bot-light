# knorke-bot

## Description
A (private) discord bot for the knorke server. This bot is based on the **Discord.js** module for **node.js**.

The bot is a lightweight version of knorke-bot and has been modified to remove database functionalities, as well as switching the Audiostream-library from ytdl to play-dl.

## Setup
To test this bot, sign into [Discord Developer Applications](https://discord.com/developers/applications) and create a new application. Now under "Settings/Bot" click "Add Bot".
With the now generated token that you can input into the **config.json** under *token*, you can now connect the client to the bot-application. It is recommended you make your own server to test the bot.

You should not run multiple clients at the same time using the same token.

Make sure to enable message-content permissions for your Bot.

For setting up with Node js run initial "npm update" to create node_modules from the project dependencies.

#### IMPORTANT:
Don't share the bots *token*!

## Development
***Please create individual Issues/Branches of things you want to add/change! Never push on the master branch!***

#### Managers:
Managers for the collections, at the moment only initialized (no methods).

#### Commands:
Create a new command by creating a .js file in the "commands" folder or subfolders. 

#### Events: 
Modify the behaviour of an [event](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584) by creating a .js file in the "events" folder and categorize it into "guild" or "client".
