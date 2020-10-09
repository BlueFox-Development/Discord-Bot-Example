require('moment-duration-format');
const Discord = require('discord.js');

exports.run = async (client, message, args, guildConf, userConf) => {

    if (!client.isOwner(message.author)) { return; }

    let commandsRun = 0;
    client.serverDB.forEach(s => {
        commandsRun = commandsRun + s.commandsRun;
    })

    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(`Stats [${client.config.version}]`)
        .addField(`Database`, `Servers: ${client.serverDB.size}\nUsers: ${client.userDB.size}`)
        .addField(`Commands`, `Commands: ${client.commands.size}\nAliases: ${client.aliases.size}\nRun: ${commandsRun}`)
        .addField(`Logging`, `Errors: ${client.config.log.errors}\nCommands: ${client.config.log.commands}`)
        .addField(`Embed Settings`, `Color: ${client.config.embed.color}\nFooter: ${client.config.embed.footer}`)
        .setFooter(client.config.embed.footer);
        embed.setTimestamp();

    await message.channel.send(embed);

    return;

}

module.exports.help = {
    name: "stats",
    description: "Checkout the stats",
    dm: true,
    aliases: []
}