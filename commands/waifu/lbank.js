const { Client, Message } = require("discord.js")
const razbetNumber = require("../../functions/razbitNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    Pair.findOne({authorID: message.author.id}, (e, pair) => {
        if(e) throw e
        if(pair) {
            if(!args[0]) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel")
            if(isNaN(args[0])) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel")
            if(0 >= args[0]) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel")
            User.findOne({userID: message.author.id}, (err, res) => {
                if(err) throw err
                if(res) {
                    if(args[0] > res.crown) return bot.panel(null, `Недостаточно средств`, null, null, "panel")
                    pair.bank += parseInt(args[0])
                    res.crown -= parseInt(args[0])
                    pair.save()
                    res.save()
                    return bot.panel(null, `Вы положили на счет профиля ${razbetNumber(parseInt(args[0]))}${bot.values.crown}`, null, null, "panel")
                }
            })
        } else {
            Pair.findOne({memberID: message.author.id}, (error, pairs) => {
                if(error) throw error
                if(pairs) {
                    if(!args[0]) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel")
                    if(isNaN(args[0])) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel")
                    if(0 >= args[0]) return bot.panel(null, `Укажите корректную сумму`, null, null, "panel")
                    User.findOne({userID: message.author.id}, (err, res) => {
                        if(err) throw err
                        if(res) {
                            if(args[0] > res.crown) return bot.panel(null, `Недостаточно средств`, null, null, "panel")
                            pairs.bank += parseInt(args[0])
                            res.crown -= parseInt(args[0])
                            pairs.save()
                            res.save()
                            return bot.panel(null, `Вы положили на счет профиля ${razbetNumber(parseInt(args[0]))}${bot.values.crown}`, null, null, "panel")
                        }
                    })
                } else {
                    return bot.panel(null, `У вас нет пары`, null, null, "panel")
                }
            })
        }
    })
}