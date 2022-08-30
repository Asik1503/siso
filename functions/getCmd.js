const { Message } = require("discord.js")
const { prefix } = require("../settings/config")

/**
 * @param {Message} message
 * @param {Boolean} prefix
 */

module.exports = (message, pref) => {
    if(pref == true) return message.content.split(" ")[0].toLowerCase()
    return message.content.split(" ")[0].toLowerCase().slice(prefix.length)
}