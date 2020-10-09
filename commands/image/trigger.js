const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = user.displayAvatarURL({
        dynamic: false,
        format: "jpg",
        size: 2048
    });
    const data = await Canvacord.Canvas.trigger(avatar);
    return message.channel.send(new MessageAttachment(data, "triggered.gif"));
};


module.exports.help = {
    name: "trigger",
    description: "TRIGGERED",
    dm: false,
    aliases: ["triggered"]
}