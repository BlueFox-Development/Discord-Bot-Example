const { Spotify } = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {

    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    if (!user.presence.activities.length) return message.channel.send(`**${user.tag}** is not listening to Spotify!`);
    const activity = user.presence.activities.find(activity => activity.type === "LISTENING" && activity.name === "Spotify");
    if (!activity) return message.channel.send(`**${user.tag}** is not listening to Spotify!`);

    const data = {
        author: activity.state,
        song: activity.details,
        album: activity.assets.largeText || activity.state,
        start: activity.timestamps.start.getTime(),
        end: activity.timestamps.end.getTime(),
        image: activity.assets.largeImageURL({ format: "png", size: 1024 })
    };

    const card = new Spotify()
        .setAlbum(data.album)
        .setAuthor(data.author)
        .setImage(data.image)
        .setTitle(data.song)
        .setStartTimestamp(data.start)
        .setEndTimestamp(data.end);

    card.build()
        .then(buffer => {
            const attachment = new MessageAttachment(buffer, `spotify_${user.id}.png`);
            return message.channel.send(`🎶 | Spotify card for **${user.tag}**`, attachment);
        })
        .catch(e => {
            message.channel.send(`❌ | Something went wrong!\n\`\`\`xl\n${e.message}\`\`\``);
        });

};


module.exports.help = {
    name: "spotify",
    description: "Spotify presence!",
    dm: false,
    aliases: []
}