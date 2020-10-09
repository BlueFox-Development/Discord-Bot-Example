const Discord = require('discord.js');
const request = require('request');

exports.run = async (client, message, args, guildConf, userConf) => {

    let username = args[0];

    if (!username) {await client.sendErrorEmbed(message.channel, 'Please provide a minecraft username'); return;}

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setFooter(client.config.embed.footer)

    request(`https://api.mojang.com/users/profiles/minecraft/${username}`, async function(err, response, body) {

        if (err) {
            console.log(err);
            await client.sendErrorEmbed(message.channel, `Error getting user`);
            return;
        }

        if (!body) {
            await client.sendErrorEmbed(message.channel, "Please provide a value username");
            return;
        }

        body = JSON.parse(body);

        embed.addField("Username", body.name);
        embed.addField("UUID", body.id)
        embed.addField("Skin", `
        View: [Click-Here](https://minotar.net/skin/${username})
        Download: [Click-Here](https://minotar.net/download/${username})
        `)
        embed.setThumbnail(`https://minotar.net/body/${username}/100.png`);

        await message.channel.send(embed);
        return;
    });

}

module.exports.help = {
    name: "mcuser",
    description: "Grabs a minecraft user's information",
    dm: true,
    cooldown: 10,
    aliases: ["minecraftuser"]
}