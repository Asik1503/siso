const { Client, Message } = require("discord.js")
const getMemb = require("../../functions/getMember")
const createDbUser = require("../../functions/createDbUser")
const razbitNumber = require("../../functions/razbitNumber")
const stn = require("../../functions/strToNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let user = getMemb(message, args[0])
    if(!user) return bot.panel(null, "Укажите пользователя", null, null, "panel", null, 15)
    let summ = stn(args.slice(1).join(' '))
    if(!summ) return bot.panel(null, "Укажите кол-во средств", null, null, "panel", null, 15)
    if(isNaN(summ)) return bot.panel(null, "Укажите кол-во средств", null, null, "panel", null, 15)
    if(summ < 1) return bot.panel(null, "Укажите кол-во средств", null, null, "panel", null, 15)
    User.findOne({userID: user.id}, (err, res) => {
        if(err) throw err
        if(res){
            res.crown += summ
            res.save()
        } else {
            res = createDbUser(user)
            res.crown += summ
            res.save()
        }
        bot.panel(`Выдача валюты`, `вы выдали ${razbitNumber(summ)}${bot.values.crown} пользователю ${user.user}`, null, null, "admin", true)
    })
}

module.exports.config = {
    admin: true
}