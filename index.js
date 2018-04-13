// Gamers Israel's Discord bot created by Blue Malgeran#3106

// Imports discord.js lib
const Discord = require('discord.js');
// Imports bot's config aka settings
const config = require('./config.json');

// The bot.
var client = new Discord.Client();

// When the bot comes online this is the functions
client.on("ready", function() {
    var clientonmessage = `
------------------------------------------------------
> Logging in...
------------------------------------------------------
Logged in as ${client.user.tag}
Working on ${client.guilds.size} servers!
${client.channels.size} channels and ${client.users.size} users cached!
I am logged in and ready to roll!
LET'S GO!
------------------------------------------------------
----------Bot created by Blue Malgeran#3106-----------
------------------------------------------------------
-----------------Bot's commands logs------------------`

    console.log(clientonmessage);

    client.user.setGame(`!accept | http://gamers-israel.co.il`, "https://twitch.tv/bluemalgeran");
});

// Member joins event! The bot will give him a role and will tell him to type !accept
client.on('guildMemberAdd', member => {
    let welcomeRole = member.guild.roles.find("name", "ממתין לאישור משתמש");
    let welcomeChannel = member.guild.channels.get('428567286559801345');
    var welcomeMSG = ` 
    \`\`\`ini
[Welcome message]
# Welcome to CS:GO Staff's official Discord server!
    
[Information]
# If you want to see the text and voice channels, please type !accept
    
[Help]
# If you need help with something please contact Blue Malgeran#3106 (The developer of this bot :3)\`\`\``
    member.addRole(welcomeRole);
    welcomeChannel.send(welcomeMSG);
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
            let logChannel = message.guild.channels.get('428656202755342336');

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
