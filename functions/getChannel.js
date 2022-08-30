const { Message } = require("discord.js")

/**
 * @param {Message} message
 * @param {string} channel
 */

module.exports = (message, channel) => {
    let Channel = message.guild.channels.cache.find(c => c.name === channel)
    if(!Channel) Channel = message.guild.channels.cache.get(channel)
    if(!Channel) Channel = message.mentions.channels.first()
    return Channel
}