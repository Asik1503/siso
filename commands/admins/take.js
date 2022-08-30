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
    if(!user) return bot.panel(null, "укажите пользователя", null, null, "admin", false, 15)
    let summ = stn(args.slice(1).join(' '))
    if(args[1] == "all") summ = "all"
    if(!summ) return bot.panel(null, "укажите кол-во средств", null, null, "admin", false, 15)
    User.findOne({userID: user.id}, (err, res) => {
        if(err) throw err
        if(res){
            if(args[1] == "all") summ = res.crown
            if(isNaN(summ)) return
            if(summ < 1) return
            if(summ > res.crown) return bot.panel(null, `у пользователя недостаточно средств`, null, null, "admin", false, 15)
            res.crown -= summ
            res.save()
        } else {
            res = createDbUser(user)
            if(args[1] == "all") summ = res.crown
            if(isNaN(summ)) return
            if(summ < 1) return
            if(summ > res.crown) return bot.panel(null, `у пользователя недостаточно средств`, null, null, "admin", false, 15)
            res.crown -= summ
            res.save()
        }
        bot.panel(null, `вы забрали ${razbitNumber(summ)}${bot.values.crown} у участника ${user.user}`, null, null, "admin", true)
    })
}

module.exports.config = {
    admin: true
}