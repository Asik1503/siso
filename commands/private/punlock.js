const { Client, Message } = require("discord.js")
const cfg = require("../../settings/config")
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
            let memPerms = ch.permissionsFor(cfg.memberRole).has("VIEW_CHANNEL")
            if(memPerms) return bot.panel(null, `Участники и так видят вашу комнату`, null, null, "panel", null, 15)

            ch.updateOverwrite(cfg.memberRole, {
                VIEW_CHANNEL: true
            })
            bot.panel(null, `Вы успешно открыли комнату для других участников`, null, null, "panel")
        }
    })
}