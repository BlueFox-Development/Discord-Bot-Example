const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const data = await Canvacord.Canvas.colorfy(user.displayAvatarURL({ format: "png", size: 2048 }), args.length > 1 ? args[1] : args[0] || "");
    return message.channel.send(new MessageAttachment(data, "colorfy.png"));
};


module.exports.help = {
    name: "colorfy",
    description: "Update color!",
    dm: false,
    aliases: []
}