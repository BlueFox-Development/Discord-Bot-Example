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
   
        await client.player.shuffle(message.guild.id, !mode);
        
	   const embedSuccess = new Discord.MessageEmbed()
		 .setFooter(client.config.embed.footer)
		 .setColor(client.config.embed.color)
		 .setDescription(`🔀 | Queue shuffled!`);

        return message.channel.send(embedSuccess);
    
};


module.exports.help = {
    name: "shuffle",
    description: "Shuffle's the queue",
    dm: false,
    aliases: []
}