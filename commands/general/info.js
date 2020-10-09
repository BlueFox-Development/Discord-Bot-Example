const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(`**Information**`)
        .setFooter(client.config.embed.footer)
        .setTimestamp();

    if (client.config.links.discord) embed.addField("Discord", client.config.links.discord)
    if (client.config.links.website) embed.addField("Website", client.config.links.website)

    await message.channel.send(embed);

    return;

}

module.exports.help = {
    name: "info",
    description: "Shows you the information",
    dm: true,
    aliases: ["i"]
}