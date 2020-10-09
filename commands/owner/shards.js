const Discord = require("discord.js");

exports.run = async (client, message, args) => {

    if (!client.isOwner(message)) { return; }

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.embed.color)
        .setTitle(`**Shards**`)
        .setFooter(client.config.embed.footer)
        .setTimestamp();

    // For each shard, get the shard ID and the number of guilds it owns
    let values = await client.shard.broadcastEval(`
    [
        this.guilds.cache.size,
        this.users.cache.size,
        this.ws.ping
    ]
    `);

    let i = 0;

    values.forEach((value) => {
        embed.addField(`✅ Shard ${i}`, `>>> Servers: ${value[0]}\nUsers: ${value[1]}\nPing: ${value[2]}ms`);
        i++;
    });

    return await message.channel.send(embed);

}

module.exports.help = {
    name: "shards",
    description: "Shows stats regarding each shard",
    dm: true,
    aliases: []
}