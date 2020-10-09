const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    if (args[0]) {
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));

        if (cmd) {
            await client.sendEmbed(message.channel, `Help`, `**Name**: ${cmd.help.name}\n**Description**: ${cmd.help.description}\n**DM**: ${cmd.help.dm}\n**Cooldown**: ${cmd.help.cooldown ? cmd.help.cooldown + " Seconds" : "None"}\n**Aliases**: ${cmd.help.aliases}`);
            return;
        } else {
            await client.sendErrorEmbed(message.channel, "That is not a valid command or alias")
            return;
        }
    }

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle('Help')
        .setFooter(client.config.embed.footer)
        .setTimestamp();

    embed.addField("General", `
    help, ping,
    serverinfo, userinfo,
    botstats, info`, false);

    embed.addField("Other", `
    coinflip, mcuser`, false)

    embed.addField("Music", `
    lyrics`, false)

    embed.addField("Staff", `
    embed, kick, ban`, false)

    if (client.isOwner(message.author)) {
        embed.addField("Owner", `
        eval, servers,
        stats, reload, shards`, false)
    }

    await message.channel.send(embed);
    return;

}

module.exports.help = {
    name: "help",
    description: "Shows help menu",
    dm: true,
    aliases: ["h"]
}
