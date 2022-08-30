const { Client, Message } = require("discord.js")
const getRole = require("../../functions/getRole")
const stn = require("../../functions/strToNumber")
const razbitNumber = require("../../functions/razbitNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!bot.admins.includes(message.author.id)) return;
    let r = getRole(message, args[0])
    if(!r) return;
    if(!r.editable) return;
    let summ = stn(args.slice(1).join(' '))
    if(isNaN(summ)) return bot.panel(null, "Укажите корректную цену товара", null, null, "panel", null, 15)
    if(summ < 1) return bot.panel(null, "Укажите корректную цену товара", null, null, "panel", null, 15)
    Shop.findOne({roleID: r.id}, (err, res) => {
        if(err) throw err
        if(res){
            return bot.panel(null, "Данный товар уже есть в магазине", null, null, "panel", null, 15)
        } else {
            let item = new Shop({roleID: r.id, cost: summ})
            item.save()
            bot.panel(null, `вы добавили роль ${r} в магазин за ${razbitNumber(summ)}${bot.values.crown}`, null, null, "admin", true)
        }
    })
}