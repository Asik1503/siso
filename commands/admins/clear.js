const { Client, Message } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!bot.admins.includes(message.author.id)) return
    let count = parseInt(args[0])
    if(!count) return bot.panel(null, "Вы не указали количество сообщений", null, null, "panel", false, 15)
    if(isNaN(count)) return bot.panel(null, "Вы не указали количество сообщений", null, null, "panel", false, 15)
    if(count < 1) return bot.panel(null, "Вы не указали количество сообщений", null, null, "panel", false, 15)
    if(count > 100) return bot.panel(null, "Вы не указали количество сообщений", null, null, "panel", false, 15)
    message.channel.bulkDelete(count)
    .then(msgs => bot.panel("Очистка чата", `вы успешно удалили **${msgs.size}** сообщений`, null, null, null, null, 5))
}