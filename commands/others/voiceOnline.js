const { Client, Message } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!bot.admins.includes(message.author.id)) return;
    bot.panel(null, `Кол-во голосового онлайна — **${message.guild.members.cache.filter(f => f.voice.channel).size}**`, null, null, "panel")
}

module.exports.config = {
    name: "online"
}