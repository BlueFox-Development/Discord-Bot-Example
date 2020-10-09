// Dependencies
const Discord = require('discord.js');
const fs = require("fs");

// Loads config.js
const config = require(`${process.cwd()}/config.js`);

// Creates shard manager
const manager = new Discord.ShardingManager(`${process.cwd()}/bot.js`, {
    totalShards: "auto",
    respawn: true,
    token: config.token
});

// Sharding Event handler
fs.readdir(`${process.cwd()}/events/sharding`, (err, files) => {
    if (err) { throw err }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        let event = require(`${process.cwd()}/events/sharding/${file}`);
        let eventName = file.split(".")[0];
        manager.on(eventName, event.bind(null, manager));
        delete require.cache[require.resolve(`${process.cwd()}/events/sharding/${file}`)];
    }
});

// Spawns shards
manager.spawn();
