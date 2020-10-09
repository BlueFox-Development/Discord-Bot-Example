const Discord = require('discord.js');
const moment = require('moment');

exports.run = async (client, message, args, guildConf) => {

    let user = message.mentions.users.first() || client.users.resolve(args[0]) || message.author;

    const member = message.guild.member(user);

    const embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(`${user.username}#${user.discriminator}`)
        .setFooter(client.config.embed.footer)

    embed.addField(`📅 Dates`, `
Joined: \`${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}\`
Created: \`${message.guild.createdAt.toDateString()}\`
`, true)

    embed.addField(`📁 Other`, `
Avatar: [Click-Here](${user.displayAvatarURL({ dynamic: true, size: 2048 })})
Last Message: [Click-Here](https://discordapp.com/channels/${message.guild.id}/${member.user.lastMessageChannelID}/${member.user.lastMessageID})
Speaking: ${member.speaking ? "\`True\` - Channel: " + message.guilds.channels.get(member.voiceChannelID) : '\`False\`'}
`, true)


    embed.addField(`⚙ General Info`, `
User ID: \`${message.author.id}\`
Nickname: \`${member.nickname !== null ? `${member.nickname}` : 'None'}\`
Bot: \`${user.bot ? "Yes" : "No"}\`
Status: \`${user.presence.status}\`
Game: \`${user.presence.game ? user.presence.game.name : 'None'}\`
`, false)

    embed.addField(`🔰 Roles [${message.member.roles.cache.size}]`, `
${member.roles.cache.map(roles => `${roles}`).join(', ').substr(0,1024)}
`, true)

    embed.setTimestamp();

    return await message.channel.send(embed);

}

module.exports.help = {
    name: "userinfo",
    description: "Shows a user's information",
    dm: false,
    aliases: ["ui", "user"]
}
