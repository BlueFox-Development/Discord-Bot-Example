const API_BASE = "https://some-random-api.ml/lyrics?title";
const fetch = require("node-fetch");

exports.run = async (client, message, args) => {

    const query = args.join(" ");
    if (!query) return message.channel.send("❌ | Please mention a search query!");

    try {
        const data = await fetch(`${API_BASE}=${encodeURIComponent(query)}`);
        const json = await data.json();
        if (!json.lyrics) return message.channel.send("❌ | No result found!");
        return message.channel.send(json.lyrics, {
            code: true,
            split: true
        });
    } catch {
        return message.channel.send("❌ | Something went wrong, please try again later!");
    }
};


module.exports.help = {
    name: "lyrics",
    description: "Finds lyrics of your song",
    dm: false,
    aliases: ["ly"]
}