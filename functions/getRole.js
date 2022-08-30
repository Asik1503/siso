const { Message } = require("discord.js")

/**
 * @param {Message} message
 * @param {string} role
 */

module.exports = (message, role) => {
    let Role = message.guild.roles.cache.find(r => r.position === Number(role))
    if(!Role) Role = message.guild.roles.cache.get(role)
    if(!Role) Role = message.guild.roles.cache.find(r => r.name === role)
    if(!Role) Role = message.mentions.roles.first()
    return Role
}