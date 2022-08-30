const { Client, Message } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!bot.admins.includes(message.author.id)) return;
    let json;
    let text = args.join(' ');
    try{
        json = JSON.parse(text);
        message.channel.send(json);
    }catch(e){
        message.channel.send(text);
    }
    message.delete();
}

module.exports.config = {
    admin: true
}