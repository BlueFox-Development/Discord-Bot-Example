const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    const avatar = user.displayAvatarURL({
        dynamic: false,
        format: "jpg",
        size: 2048
    });
    const data = await Canvacord.Canvas.trash(avatar);
    return message.channel.send(new MessageAttachment(data, "trash.png"));
};


module.exports.help = {
    name: "trash",
    description: "Trash?",
    dm: false,
    aliases: []
}