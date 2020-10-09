const discord = require("discord.js");

exports.run = async (client, message, args, guildConf) => {

    if (!client.isOwner(message.author.id)) { return; }

    let codeArr = args.slice(0).join(" ").split("\n");

    if (!codeArr[codeArr.length - 1].startsWith("return")) {
      codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`;
    }

    const code = `async () => { ${codeArr.join("\n")} }`;

    if (!args[0]) { await client.sendErrorEmbed(message.channel, "Please provide code to run"); return; }

    let func = eval(code);
    let evaled = await func();

    if (typeof evaled !== "string") {
      evaled = require("util").inspect(evaled);
    }

    evaled = evaled.replace(client.token, "[TOKEN]");

    await message.channel.send(evaled, { split: true, code: "js" });

}

module.exports.help = {
  name: "eval",
  description: "Evaluates (runs) JavaScript code",
  dm: true,
  aliases: ["ev"]
}
