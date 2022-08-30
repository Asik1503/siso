const { Client, Message } = require("discord.js")
const console = require("../../functions/consoleLogger")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return bot.panel(null, `Укажите пользователя`, null, null, "panel", null, 15)
    if(isNaN(args[0])) return
    if(args[0].length !== 18) return
    message.guild.fetchBan(args[0]).catch(e => {
        return bot.panel(null, `Участник не забанен`, null, null, "panel", null, 15)
    })
    message.guild.members.unban(args[0]).then(u => {
        return bot.panel(null, `участник с id **${args[0]}** был разбанен`, null, null, "admin", true)
    }).catch(e => {
        return
    })
}