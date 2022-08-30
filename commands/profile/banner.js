const { Client, Message, MessageEmbed } = require("discord.js")
const cfg = require("../../settings/config")
const isUrl = require("is-url")
const checkImg = require("../../functions/checkImg")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot,message,args) => {
    if(message.attachments.first()){
        if(!checkImg(message.attachments.first().url)) return 
        User.findOne({userID: message.author.id}, (err, res) => {
            if(err) return bot.dbErr(err.message)
            if(res){
                if(res.crown < cfg.bannerPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
                res.profileImg = message.attachments.first().url
                res.crown -= cfg.bannerPrice
                res.save()
                let ok = new MessageEmbed()
                .setAuthor(message.member.displayName, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
                .setDescription("Вы успешно изменили баннер в профиле на:")
                .setImage(message.attachments.first().url)
                .setColor("#36393f")
                return message.channel.send(ok)
            }
        })
    }
    if(!args[0] && !message.attachments) return bot.panel(null, "Вы не указали баннер", null, null, "panel", null, 15)
    if(!checkImg(args[0])) return
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) return bot.dbErr(err.message)
        if(res){
            if(args[0] == "reset" || args[0] == "https://media.discordapp.net/attachments/743044590012989491/743044739531669584/05ff3fa5eae906c3.gif"){
                res.profileImg = "https://media.discordapp.net/attachments/743044590012989491/743044739531669584/05ff3fa5eae906c3.gif"
                res.save()
                return bot.panel(null, "вы успешно сбросили свой баннер")
            }
            if(res.crown < cfg.bannerPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
            res.profileImg = args[0]
            res.crown -= cfg.bannerPrice
            let ok = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setDescription("Вы успешно изменили баннер в профиле на:")
            .setImage(args[0])
            .setColor("#36393f")
            message.channel.send(ok)
            res.save()
        }
    })
}