exports.run = async (client, message, args, guildConf) => {

    let msg = args.join(' ');

    if (!client.checkPerms(message)) {await client.sendErrorEmbed(`Insufficient permissions`); return;}
    if (!msg) {await client.sendErrorEmbed(message.channel, 'Please provide a message to embed'); return;}

    await message.delete();
    await client.sendEmbed(message.channel, "", args.join("").slice(0, 1024), "", `From: ${message.author.username}`)

    return;

};

module.exports.help = {
    name: "embed",
    description: "Makes the bot send an embed",
    dm: false,
    aliases: ["say"]
}