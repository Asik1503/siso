const { Client, Message } = require("discord.js")
const random = require("random")
const razbitNumber = require("../../functions/razbitNumber")
const stn = require("../../functions/strToNumber")
const math = require("mathjs")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            let summ = stn(args.join(' '))
            if(args[0] == "all") summ = res.crown > 300 ? 300 : res.crown
            if(isNaN(summ)) return bot.panel(null, "Укажите ставку", null, null, "panel")
            if(summ < 1) return bot.panel(null, "Минимальная ставка - 1", null, null, "panel")
            if(summ > 1000) return bot.panel(null, "Максимальная ставка - 1000", null, null, "panel")
            if(res.crown < parseInt(summ)) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
            let rand = Math.floor(math.random(0, 120))
            if(rand >= 60 && rand <= 100){
                res.crown += summ
                res.save()
                bot.panel(null, `Выпадает **${rand}**, поздравляю тебя!\n> ты получаешь свои ${razbitNumber(parseInt(summ * 2))}${bot.values.crown}`, "GREEN", true)
            } else if(rand >= 101 && rand <= 119){
                res.crown += parseInt(summ * 3 - summ)
                res.save()
                bot.panel(null, `Выпадает **${rand}**, поздравляю тебя!\n> ты получаешь свои ${razbitNumber(parseInt(summ * 3))}${bot.values.crown}`, "GREEN", true)
            } else if(rand == 120){
                res.crown += parseInt(summ * 10 - summ)
                res.save()
                bot.panel(null, `Выпадает **${rand}**, поздравляю тебя!\n> ты получаешь свои ${razbitNumber(parseInt(summ * 10))}${bot.values.crown}`, "GREEN", true)
            } else {
                res.crown -= summ
                res.save()
                bot.panel(null, `Выпадает **${rand}**, ты проиграл!\n> не расстраивайся, повезет в следующий раз.`, "RED", true)
            }
        }
    })
}
