const Discord = require('discord.js');

exports.run = async (client, message, args, guildConf) => {

    const msg = await client.sendEmbed(message.channel, `Pinging...`);

    let apiPing = Math.round(client.ws.ping)
    let apiPingRating = "LOW";

    if (apiPing > 1000) {
        apiPingRating = "VERY HIGH";
    } else if (apiPing > 500) {
        apiPingRating = "HIGH";
    } else if (apiPing > 300) {
        apiPingRating = "MEDIUM";
    }

    let ping = msg.createdTimestamp - message.createdTimestamp;
    let pingRating = "LOW"

    if (ping > 1000) {
        pingRating = "VERY HIGH";
    } else if (ping > 500) {
        pingRating = "HIGH";
    } else if (ping > 300) {
        pingRating = "MEDIUM";
    }

    await client.editEmbed(message.channel, msg.id, 'Pong!', "", [
        { name: "Bot Latency", value: `[${pingRating}] ${ping}ms` },
        { name: "API Latency", value: `[${apiPingRating}] ${apiPing}ms` }
        ])
    return;

}

module.exports.help = {
    name: "ping",
    description: "Checks the latency of the bot and discord api",
    dm: true,
    cooldown: 15,
    aliases: ["p"]
}