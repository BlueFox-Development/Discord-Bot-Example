const Discord = require("discord.js");

exports.run = async (client, message, args) => {
        
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

        await client.player.pause(message.guild.id);
        
	   const embedSuccess = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
		.setDescription(`⏸ | Paused the player!`);

        return message.channel.send(embedSuccess);
    
};


module.exports.help = {
    name: "pause",
    description: "Pause's the playing music",
    dm: false,
    aliases: []
}