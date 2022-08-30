const { Client, Message } = require("discord.js")
const getChannel = require("../../functions/getChannel")
const getMemb = require("../../functions/getMember")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            let ch = getChannel(message, res.room)
            let perms = ch ? ch.permissionsFor(message.member).has("MANAGE_CHANNELS") : false
            if(!perms) return bot.panel(null, `Вы не находитесь в своей приватной комнате`, null, null, "panel", null, 15)
            let memb = getMemb(message, args[0])
            if(!memb) return bot.panel(null, "Укажите пользователя", null, null, "panel", null, 15)
            if(memb == message.member) return bot.panel(null, "Укажите пользователя", null, null, "panel", null, 15)
            if(!memb.voice.channel) return bot.panel(null, "Этот пользователь не находится в вашей комнате", null, null, "panel", null, 15)
            if(memb.voice.channel !== ch) return bot.panel(null, "Этот пользователь не находится в вашей комнате", null, null, "panel", null, 15)

            User.findOne({userID: memb.user.id}, (error, data) => {
                if(error) throw error
                if(data) {
                    res.room = "0"
                    data.room = message.member.voice.channel.id
                    res.save()
                    data.save()
                    ch.createOverwrite(memb, {
                        MANAGE_CHANNELS: true
                    })
                    ch.createOverwrite(message.member.id, {
                        MANAGE_CHANNELS: false
                    })
                    bot.panel(null, `Вы успешно передали права на комнату участнику ${memb.user}`, null, null, "panel")
                }
            })
        }
    })
}