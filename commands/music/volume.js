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
  
        let volume = args[0];
        
        let queue = await client.player.getQueue(message.guild.id);
        
	   const embedSuccess = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
	 	.setDescription(`🔊 | Current Volume: **${queue.volume}%**`);

        if (!volume || isNaN(volume)) return message.channel.send(embedSuccess);
        
        volume = Math.round(parseInt(volume));
        
	   const embederrorVolumeExeeded = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
	 	.setDescription(`❌ | Volume must be more than or equal to 0 and less than or equal to 150!`);


        if (volume < 0 || volume > 150) return message.channel.send(embederrorVolumeExeeded);
        
        await client.player.setVolume(message.guild.id, volume);
        
	   const embedSuccess2 = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
	 	.setDescription(`✅ | Volume set to **${volume}%**`);


        return message.channel.send(embedSuccess2);
    
};


module.exports.help = {
    name: "volume",
    description: "Add's to the default volume",
    dm: false,
    aliases: []
}