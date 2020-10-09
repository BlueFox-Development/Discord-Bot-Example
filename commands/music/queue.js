const { Util, MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
        
        const embederrorNotInVC = new MessageEmbed()
	 .setFooter(client.config.embed.footer)
	 .setColor(client.config.embed.color)
	 .setDescription(`❌ | You are not in a voice channel!`);
	 
	    
        if (!message.member.voice.channel) return message.channel.send(embederrorNotInVC);
        
	const embederrorNotInMyVC = new MessageEmbed()
	 .setFooter(client.config.embed.footer)
	 .setColor(client.config.embed.color)
	 .setDescription(`❌ | You are not in my voice channel!`);
	
	
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embederrorNotInMyVC);
        
	const embederrorNotPlaying = new MessageEmbed()
	 .setFooter(client.config.embed.footer)
	 .setColor(client.config.embed.color)
	 .setDescription(`❌ | I'm not playing anything!`);
	
	
        if (!client.player.isPlaying(message.guild.id)) {
            return message.channel.send(embederrorNotPlaying);
        }     
   
        let queue = await client.player.getQueue(message.guild.id);
        
        let songs = queue.tracks.map((track, i) => {
            return `${i + 1} | **${track.name}** - **${track.author}**`;
        }).join('\n');
        
        let current = await client.player.nowPlaying(message.guild.id);
        
        current = `▶ | **${current.name}** - **${current.author}**\n`;
        
        current += songs;
        
        let chunks = client.Util.splitEmbedDescription(current, "\n");
        
        let total = chunks.length;
        
        let first = chunks.shift();
        
        const embed = new MessageEmbed()
            .setTitle("Queue")
            .setDescription(first)
            .setColor(client.config.embed.color)
            .setFooter(`Page 1/${total}`)
            .setTimestamp();
        message.channel.send(embed);
        
        chunks.forEach((c, i) => {
            const emb = new MessageEmbed()
                .setDescription(c)
                .setColor(client.config.embed.color)
                .setFooter(`Page ${i + 2}/${total}`)
                .setTimestamp();
            message.channel.send(emb);
        })
    
};


module.exports.help = {
    name: "queue",
    description: "Get's the queue of the guild",
    dm: false,
    aliases: []
}