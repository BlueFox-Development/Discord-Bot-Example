const filters = require(`${process.cwd()}/filters.json`);
const Discord = require("discord.js");


exports.run = async(client, message, args) => {


    const embederrorNotInVC = new Discord.MessageEmbed()
	 .setFooter(client.config.embed.footer)
	 .setColor(client.config.embed.color)
	 .setDescription(`❌ | You are not in a voice channel!`);
	 
	    
        if (!message.member.voice.channel) return message.channel.send(embederrorNotInVC);
        
	const embederrorNotInMyVC = new Discord.MessageEmbed()
	 .setFooter(client.config.embed.footer)
	 .setColor(client.config.embed.color)
	 .setDescription(`❌ | You are not in my voice channel!`);
	
	
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embederrorNotInMyVC);
        
	const embederrorNotPlaying = new Discord.MessageEmbed()
	 .setFooter(client.config.embed.footer)
	 .setColor(client.config.embed.color)
	 .setDescription(`❌ | I'm not playing anything!`);
	
	
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send(embederrorNotPlaying);
        }


    const filter = args[0];

    if(!filter) return message.channel.send(`Please specify a valid filter to enable or disable!`);

    const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());

    if(!filterToUpdate) return message.channel.send(`This filter doesn't exist!`);

    const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);

    const queueFilters = client.player.getQueue(message.guild.id).filters;
	
    const filtersUpdated = {};
	
    filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
	
    client.player.setFilters(message.guild.id, filtersUpdated);

    if(filtersUpdated[filterRealName]) {

        message.channel.send(`I'm adding the filter to the music, please wait... Note : the longer the music is, the longer the wait will be!`);

    } else {
	    
        message.channel.send(`I'm disabling the filter on the music, please wait... Note : the longer the music is playing, the longer the wait will be!`);

    }

}

module.exports.help = {
    name: "filter",
    description: "Add's one of the valid effects/filters to the playing music",
    dm: false,
    aliases: []
}
