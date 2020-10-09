const { Util } = require("discord.js"),
      Discord = require("discord.js");

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
        
	   let query = args.join(" ");
        
	   const embederrorQueryNotPresent = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
	 	.setDescription(`❌ | Please provide a search query!`);


        if (!query) return message.channel.send(embederrorQueryNotPresent );
        
	   const embederrorNoSongFound = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
	 	.setDescription(`❌ | No results were found!`);


        let search = await client.player.searchTracks(query).catch(e => { 
            return message.channel.send(embederrorNoSongFound);
        });
        
        if (search.length < 1) return message.channel.send(embederrorNoSongFound );
        
        let track = search[0];
        
	   const embederrorSongTooLong = new Discord.MessageEmbed()
	 	.setFooter(client.config.embed.footer)
	 	.setColor(client.config.embed.color)
	 	.setDescription(`❌ | Cannot play the songs that are longer than 3 hours.`);


        if ((track.duration.split(":").length >= 3) && parseInt(track.duration.split(":")[0]) >= 3 && parseInt(track.duration.split(":")[2]) >= 1) return message.channel.send(embederrorSongTooLong);
        
        if (client.player.isPlaying(message.guild.id)) {
            
            let playing = await client.player.addToQueue(message.guild.id, track, message.author);
            
		  const embedSuccess = new Discord.MessageEmbed()
	 		.setFooter(client.config.embed.footer)
	 		.setColor(client.config.embed.color)
	 		.setDescription(`🎵 | ${(!playing.description ? "Playlist **" + Util.escapeMarkdown(track.name) : "Song **" + Util.escapeMarkdown(track.name))}**  by **${Util.escapeMarkdown(track.author)}** - added to queue!`);

            return message.channel.send(embedSuccess);
        } else {
            
            let playing = await client.player.play(message.member.voice.channel, track, message.author);
            
		  const embedSuccess2 = new Discord.MessageEmbed()
	 		.setFooter(client.config.embed.footer)
	 		.setColor(client.config.embed.color)
	 		.setDescription(`🎵 | ${(!playing.description ? "Playlist **" + Util.escapeMarkdown(track.name) : "Song **" + Util.escapeMarkdown(track.name))}**  by **${Util.escapeMarkdown(track.author)}**`);


            return message.channel.send(embedSuccess2);
        }
    
};


module.exports.help = {
    name: "play",
    description: "Play's some music in a VC",
    dm: false,
    aliases: []
}