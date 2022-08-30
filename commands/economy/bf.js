const { Client, Message } = require("discord.js")
const razbitNumber = require("../../functions/razbitNumber")
const random = require("random")
const stn = require("../../functions/strToNumber")
const a = ["t", "h"]

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let summ = stn(args.join(' '))
    if(isNaN(summ)) return bot.panel(null, "Укажите ставку", null, null, "panel")
    if(summ < 1) return bot.panel(null, "Минимальная ставка - 1", null, null, "panel")
    if(summ > 1000) return bot.panel(null, "Максимальная ставка - 1000", null, null, "panel")
    if(!a.includes(args[1])) return
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            if(summ > res.crown) return bot.panel(null, `у вас недостаточно средств`)
            let rnd = random.int(0, 100)
            let i = random.int(0, 1)
            if(rnd >= 50 && args[1] == a[i]){
                res.crown += summ
                res.save()
                bot.panel(null, `**Вы угадали сторону монетки**\n> добавлено ${razbitNumber(summ)}${bot.values.crown}`, "GREEN", true)
            } else {
                res.crown -= summ
                res.save()
                bot.panel(null, `**Вы не угадали сторону монетки**\n> ничего, в следующий раз повезет...`, "RED", true)
            }
        }
    })
}