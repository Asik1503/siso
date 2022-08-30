const { Client, Message } = require("discord.js")
const cfg = require("../../settings/config")
const getRole = require("../../functions/getRole")
const razbitNumber = require("../../functions/razbitNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(isNaN(args[0])) return bot.panel(null, "Укажите корректный номер товара", null, null, "panel", null, 15)
    Shop.find({__v: 0}, (err, res) => {
        if(err) throw err;
        if(res && res.length > 0){
            let item = res[parseInt(args[0] - 1)]
            if(!item) return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15)
            let r = getRole(message, item.roleID)
            if(!r) return
            if(!r.editable) return
            if(message.member.roles.cache.has(r.id)) return bot.panel(null, `У вас уже есть данная роль`, null, null, "panel", null, 15)
            User.findOne({userID: message.author.id}, (error, data) => {
                if(error) throw error;
                if(data){
                    if(item.cost > data.crown) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
                    data.crown -= item.cost
                    data.save()
                    message.member.roles.add(r)
                    bot.panel(" Успешная покупка ", `вы приобрели **${r}**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(item.cost)} коронок`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
                }
            })
        }
    })
}