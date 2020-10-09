// Start time
let startDate = new Date();

// Bot Dependencies
const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require('enmap');

// Create client
const client = new Discord.Client({
    fetchAllMembers: true
});

// Import the player from discord-player
const { Player } = require("discord-player");

//Load the custom filters from the MusicConfig file
const { customFilters } = require(`${process.cwd()}/MusicConfig.js`);

// Create a new Player
const player = new Player(client, { 
    leaveOnEmpty: false, 
    leaveOnEnd:   false, 
    leaveOnStop:  true 
});

// load custom filters
Object.keys(customFilters).forEach(c => {
    player.filters[`${c}`] = customFilters[c];
});


// To easily access the player
client.player = player;


// Loads config.js
config = require(`${process.cwd()}/config.js`);
client.config = config;

// Start time
client.startDate = startDate;

// Categories of commands
const modules = fs.readdirSync(`${process.cwd()}/commands`);
client.modules = modules;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.serverDB = new Enmap({
    name: "servers",
    fetchAll: false,
    autoFetch: true,
    dataDir: `${process.cwd()}/data/servers/`,
    cloneLevel: 'deep'
});

client.userDB = new Enmap({
    name: "users",
    fetchAll: false,
    autoFetch: true,
    dataDir: `${process.cwd()}/data/users/`,
    cloneLevel: 'deep'
});

// Sets default settings for each server
const defaultServerDB = {
    prefix: "-",
    commandsRun: 0
}
client.defaultServerDB = defaultServerDB;

// Load modules
fs.readdir(`${process.cwd()}/modules/`, (err, files) => {
    if (err) { throw err }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        require(`${process.cwd()}/modules/${file}`)(client);
    }
});

// Command handler
modules.forEach(cmd => {
    fs.readdir(`${process.cwd()}/commands/${cmd}/`, (err, files) => {
        if (err) { throw err }
        files.forEach(f => {
            let commandName = f.split(".")[0];
            const props = require(`${process.cwd()}/commands/${cmd}/${f}`);
            props.help.category = `${cmd[0].toUpperCase()}${cmd.slice(1).toLowerCase()}`;
            if (!client.config.disabledCommands.includes(commandName)) {
                client.commands.set(commandName, props);
                props.help.aliases.forEach(a => {
                    client.aliases.set(a, props.help.name)
                });
            }
        });
    });
});

// Discord Event handler
fs.readdir(`${process.cwd()}/events/discord/`, (err, files) => {
    if (err) { throw err }
    for (const file of files) {
        if (!file.endsWith(".js")) continue;
        let event = require(`${process.cwd()}/events/discord/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`${process.cwd()}/events/discord/${file}`)];
    }
});

// Log into client
try {
    client.login(client.config.token);
} catch(e) {
    console.error(`Invalid token: ${e}`);
    return;
}
