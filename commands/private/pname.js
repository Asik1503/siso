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
            let name = args.join(" ")
            if(!name) return bot.panel(null, `Вы не указали название своей приватной комнаты`, null, null, "panel", null, 15)

            ch.setName(name)
            bot.panel(null, `Вы успешно изменили название комнаты`, null, null, "panel")
        }
    })
}