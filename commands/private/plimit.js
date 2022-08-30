const { Client, Message } = require("discord.js")
const getChannel = require("../../functions/getChannel")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res) {
            let ch = getChannel(message, res.room)
            let perms = ch ? ch.permissionsFor(message.member).has("MANAGE_CHANNELS") : false
            if(!perms) return bot.panel(null, `Вы не находитесь в своей приватной комнате`, null, null, "panel", null, 15)
            if(!args[0]) return bot.panel(null, `Вы не указали лимит для комнаты`, null, null, "panel", null, 15)
            if(isNaN(args[0])) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel", null, 15)
            if(0 >= args[0]) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel", null, 15)
            if(args[0] >= 100) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel", null, 15)

            ch.setUserLimit(parseInt(args[0]))
            bot.panel(null, `Вы успешно изменили лимит комнаты`, null, null, "panel")
        }
    })
}