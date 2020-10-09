const Discord = require("discord.js");
const PastebinAPI = require('pastebin-js');

exports.run = async (client, message, args) => {

    if (!client.isOwner(message)) { return; }

    let key = client.config.api.pastebin;

    if (!key) {await client.sendErrorEmbed(message.channel, "Invalid pastebin api key"); return;}

    const pastebin = new PastebinAPI({
        'api_dev_key' : key
    });

    let servers = "";

    client.guilds.cache.forEach(g => {
        servers = servers + `${g.name} ► Users: ${g.memberCount}\n`;
    });

    pastebin.createPaste("Servers: \n" + servers, "Servers")
        .then(function (data) {
            client.sendEmbed(message.channel, "Success!", `[Click Here](${data})`);
            return;
        }).fail(function (err) {
            console.log(err);
            client.sendErrorEmbed(message.channel, "An unexpected error has occured");
            return;
        })

}

module.exports.help = {
    name: "servers",
    description: "Generates a pastebin link with all the current guilds",
    dm: true,
    cooldown: 30,
    aliases: []
}