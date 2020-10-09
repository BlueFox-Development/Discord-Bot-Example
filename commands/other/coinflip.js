const Discord = require("discord.js");

exports.run = async (client, message, args, guildConf, userConf) => {

    let images = {
        heads: "https://cdn.discordapp.com/attachments/637105382631669760/675097745295540244/heads.png",
        tails: "https://cdn.discordapp.com/attachments/637105382631669760/675097748747452431/tails.png"
    }

    let sides = ["Heads", "Tails"];
    let flip = sides[Math.floor(Math.random() * sides.length)];

    await client.sendEmbed(message.channel, `Coin flipped!`, `You got **${flip}**!`, "", "", '', flip === "Heads" ? images.heads : images.tails);

    return;

}

module.exports.help = {
    name: "coinflip",
    description: "Flips a coin",
    dm: true,
    aliases: ["cf", "flip"]
}