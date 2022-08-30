const { Client, Message, MessageEmbed } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!bot.admins.includes(message.author.id)) return;
    try {
        let evaled;
        let toEval = args.join(" ");
        if(toEval) {
            evaled = eval(toEval);
            let type = typeof(evaled);
            evaled = require('util').inspect(evaled, { depth: 0, maxArrayLength: null });
            const types = type[0].toUpperCase() + type.slice(1);
            return message.channel.send(`\`\`\`js\n✅ Successful\nType: ${types}\nDone for: ${Math.round((new Date().getTime() - message.createdTimestamp) / 1000) + 's'}\n\n${evaled}\`\`\``);
        };
    }catch(e) {
        return message.channel.send(`\`\`\`js\n❌${e}\`\`\``);
    };
};