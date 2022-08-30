const { Client, Message } = require("discord.js");
const getChannel = require("../../functions/getChannel");

/**
 * @param {Client} bot
 * @param {Message} Message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    let channel = getChannel(message, args[0])
    if(!channel) return;
    let msg = args[1];
    if(!msg) return;
    let embed = args.slice(2).join(" ")
    if(!embed) return;
    try {
        message.guild.channels.cache.get(channel.id).messages.fetch(args[1]).then(msg => {
            let json = JSON.parse(embed);
            msg.edit({embed: json})
        });
    }catch(e) {
        return message.channel.send("error")
    }
}

module.exports.config = {
    admin: true
}