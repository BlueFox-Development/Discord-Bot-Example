const discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {

    if (!client.isOwner(message.author.id)) { return; }

    if (!args[0]) {await client.sendErrorEmbed(message.channel, "Please provide a command to reload!"); return;};

    const commandName = args[0].toLowerCase();
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
	
    if (!command) {await client.sendErrorEmbed(message.channel, "That command doesn't exist. Try again."); return;}
	
    fs.readdirSync(`${process.cwd()}/commands`).forEach(f => {
    	const files = fs.readdirSync(`${process.cwd()}/commands/${f}`);
    	if (files.includes(`${commandName}.js`)) {
    		const file = `${process.cwd()}/commands/${f}/${commandName}.js`;
    		try {
    			delete require.cache[require.resolve(file)];
			  	client.commands.delete(commandName);
			  	const pull = require(file);
			  	client.commands.set(commandName, pull);
			  	client.sendEmbed(message.channel, "Successfully reloaded!", `Command: \`${commandName}.js\``);
			  	return;
    		} catch (err) {
				client.sendErrorEmbed(message.channel, "Could not reload!");
		  		console.log(err.stack || err);
		  		return;
    		}
    	}
    })

}

module.exports.help = {
  name: "reload",
  description: "Reload's a command",
  dm: true,
  aliases: ["r"]
}
