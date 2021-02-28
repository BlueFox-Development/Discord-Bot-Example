const moment = require('moment');
const Discord = require('discord.js');

module.exports = (client) => {

    client.wait = (ms) => {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime()
        }
        return;
    }

    client.log = (title, msg) => {
        let time = moment().format(client.config.timeFormat);
        if (!title) title = 'Log';
        console.log(`${time} [${title}] ${msg}`);
    }

    client.check = (id) => {
        client.serverDB.ensure(id, client.defaultServerDB);
    }

    client.checkPerms = (message) => {
        return (message.member.hasPermission('ADMINISTRATOR') || client.isOwner(message));
    }

    client.isOwner = (author) => {
        author = client.users.resolve(author);
        if(!author) return false;
        return (client.config.owners.includes(author.id));
    }

    client.errorEmbed = (error, usage) => {
        let e = new Discord.MessageEmbed()
        e.setDescription(`
:x: **Error:** \`\`\`${error}\`\`\`
:gear: **Correct Usage:** \`\`\`${usage}\`\`\`
`)
        e.setColor(client.config.embed.color)
        e.setFooter(client.config.embed.footer)
        e.setTimestamp();
        return e;
    }

    client.noPerms = (command) => {
        let e = new Discord.MessageEmbed()
        e.setDescription(`
:x: **Error:** \`You do not have permissions to use this!\`
**Missing:** \`ADMINISTRATOR or ROLE\`
`)
        e.setColor(client.config.embed.color)
        e.setFooter(client.config.embed.footer)
        e.setTimestamp();
        return e;
    }


}
