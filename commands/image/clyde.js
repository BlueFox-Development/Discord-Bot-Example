const Canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

    const msg = args.join(" ") || "Provide text!";

    const data = await Canvacord.Canvas.clyde(msg);
    return message.channel.send(new MessageAttachment(data, "clyde.png"));
};


module.exports.help = {
    name: "clyde",
    description: "Make clyde say something!",
    dm: false,
    aliases: []
}