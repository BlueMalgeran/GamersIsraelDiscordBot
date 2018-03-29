// Gamers Israel's Discord bot created by Blue Malgeran#3106

// Imports discord.js lib
const Discord = require('discord.js');
// Imports bot's config aka settings
const config = require('./config.json');

// The bot.
var client = new Discord.Client();

// When the bot comes online this is the functions
client.on("ready", function() {
    console.log('I\'m online!');

    client.user.setGame(`http://gamers-israel.co.il`, "https://twitch.tv/bluemalgeran");
});

client.on('guildMemberAdd', member => {
    let welcomeRole = member.guild.roles.find("name", "ממתין לאישור משתמש");
    member.addRole(welcomeRole);
});

// Message functions with the bot
client.on("message", function(message) {
    // Ignores the bot if he some how tries to use a command
    if (message.author.equals(client.user)) return;

    // Ignores if someone uses the prefix for nothing.
    if (!message.content.startsWith(config.PREFIX)) return;

    // Ignores command on DMs
    if (message.channel.type == "dm") return console.log(`${message.author.tag} tried to use a command in DM!`);

    // Args for the prefix
    var args = message.content.substring(config.PREFIX.length).split(" ");

    switch (args[0]) {
        // Commands from here! case is the start of a command and break; will end the command.
        case "accept":
            let acceptRole = message.guild.roles.find("name", "Gamers-IL | Verified");
            let removeRole = message.guild.roles.find("name", "ממתין לאישור משתמש");
            let logChannel = message.guild.channels.find("name", "bot-join-log");

            if (message.member.roles.find("name", "Gamers-IL | Verified")) {
                message.reply("וולאק יש לך את הרול הזה מה אתה חופר");
            } else {
                console.log(`${message.author.tag} has been accepted!`);
                logChannel.send(`${message.author.tag} has been accepted!`);
            }
            message.member.addRole(acceptRole);
            message.member.removeRole(removeRole);
            message.delete();
        break;
    }
});

// Bot's login token (Synced from config.json)
client.login(config.TOKEN);
