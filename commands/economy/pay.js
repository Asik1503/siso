const { Client, Message } = require("discord.js")
const getMemb = require("../../functions/getMember")
const razbitNumber = require("../../functions/razbitNumber")
const stn = require("../../functions/strToNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot,message,args) => {
    let memb = getMemb(message, args[0])
    if(!memb) return bot.panel(null, "Укажите пользователя!", null, null, "panel", null, 15)
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            let num = stn(args.slice(1).join(' '))
            if(args[1] == "all") num = res.crown
            if(isNaN(num)) return bot.panel(null, "Укажите сумму!", null, null, "panel", null, 15)
            if(num < 1) return
            if(num > res.crown) return bot.panel(null, `У вас недостаточно средств!`, null, null, "panel", null, 15)
            if(memb.id == message.author.id) return bot.panel(`Перевод средств`, `начисляет ${razbitNumber(num)}${bot.values.crown} на счет ${memb.user}\nВидимо, у нас появился новый миллионер!`)
            User.findOne({userID: memb.id}, (error, data) => {
                if(error) throw err
                if(data){
                    res.crown -= num
                    res.save()
                    data.crown += num
                    data.save()
                    bot.panel(` Перевод средств `, `начисляет ${razbitNumber(num)}${bot.values.crown} на счет ${memb.user}\nВидимо, у нас появился новый миллионер!`)
                } else {
                    let usr = new User({userID: memb.id})
                    res.crown -= num
                    res.save()
                    usr.crown += num
                    usr.save()
                    bot.panel(` Перевод средств `, `начисляет ${razbitNumber(num)}${bot.values.crown} на счет ${memb.user}\nВидимо, у нас появился новый миллионер!`)
                }
            })
        }
    })
}

module.exports.config = {
    alias: ["transfer", "give"]
}