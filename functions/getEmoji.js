const { Message } = require("discord.js")

/**
 * @param {Message} message
 * @param {string} emoji
 */

module.exports = (message, emoji) => {
    let Emoji = message.guild.emojis.cache.find(e => `<:${e.name}:${e.id}>` === `${emoji}`)
    if(!Emoji) Emoji = message.guild.emojis.cache.find(e => `<a:${e.name}:${e.id}>` === `${emoji}`)
    if(!Emoji) Emoji = message.guild.emojis.cache.get(emoji)
    if(!Emoji) Emoji = message.guild.emojis.cache.find(e => e.name === emoji)
    return Emoji
}