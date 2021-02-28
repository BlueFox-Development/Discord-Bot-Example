const { Util } = require("discord.js");

class ClientUtil {

    static splitEmbedDescription(text, char="") {
        let chunks = Util.splitMessage(text, {
            char,
            maxLength: 2048
        });
        return chunks;
    }

}

module.exports = ClientUtil;
