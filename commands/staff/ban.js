const Discord = require('discord.js');

exports.run = async (client, message, args, guildConf, userConf) => {

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.splice(1, args.length).join(' ');

    if (!client.checkPerms(message)) {await client.sendErrorEmbed(`Insufficient permissions`); return;}
    if (!user) {await client.sendErrorEmbed(message.channel, 'Please provide a user'); return;}
    if (user.id === message.author.id) {await client.sendErrorEmbed(message.channel, "You can't ban yourself"); return;}
    if (!user.bannable) {await client.sendErrorEmbed(message.channel, "I can't ban that user"); return;}

    try {
        await user.ban();
    } catch {
        await client.sendErrorEmbed(message.channel, 'An error has occured');
        return;
    }

    await client.sendEmbed(message.channel, `Member Banned`, `
    Member: ${user}
    ID: ${user.id}
    `, [], `Reason: ${reason ? reason : "None"}`, "", "", "https://media.giphy.com/media/1Nclw5CJ3N77G/giphy.gif")

    return;
}

module.exports.help = {
    name: "kick",
    description: "Kicks  a user",
    dm: false,
    aliases: []
}