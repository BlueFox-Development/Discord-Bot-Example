const filters = require(`${process.cwd()}/filters.json`);
const Discord = require("discord.js")

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


    const enabledEmoji = ":white_check_mark:";
    const disabledEmoji = ":x:";

    const filtersStatuses = [ [], [] ];

    Object.keys(filters).forEach((filterName) => {
        const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
        array.push(filters[filterName] + " : " + (client.player.getQueue(message.guild.id).filters[filterName] ? enabledEmoji : disabledEmoji));
    });


    const list = new Discord.MessageEmbed()
    .setColor(client.config.embed.color)
    .setFooter(client.config.embed.footer)
    .setDescription(`List of all filters enabled or disabled.\nTo add a filter to a \`${client.serverDB.get(message.guild.id).prefix}filter\` music.`)
    .addField("**Filters**", filtersStatuses[0].join('\n'), true)
    .addField("** **", filtersStatuses[1].join('\n'), true);

    //Message
    message.channel.send(list);

	
}


module.exports.help = {
    name: "w-filters",
    description: "Show's all the available filters",
    dm: false,
    aliases: []
}