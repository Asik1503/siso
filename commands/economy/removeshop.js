const { Client, Message } = require("discord.js")
const cfg = require("../../settings/config")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot,message,args) => {
    if(!bot.admins.includes(message.author.id)) return
    if(isNaN(args[0])) return bot.panel(null, "Укажите корректный номер товара", null, null, "panel", null, 15)
    if(cfg.shopSortType == 0){
        Shop.find({__v: 0}).exec((err, res) => {
            if(err) throw err
            if(res && res.length > 0){
                let item = res[parseInt(args[0] - 1)]
                if(!item) return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15)
                bot.panel(null, `вы удалили роль <@&${item.roleID}> с магазина`, null, null, "admin", true)
                return item.remove()
            }
        })
    } else if(cfg.shopSortType == 1){
        Shop.find({__v: 0}).sort([['cost','ascending']]).exec((err, res) => {
            if(err) return bot.dbErr(err.message)
            if(res && res.length > 0){
                let item = res[parseInt(args[0] - 1)]
                if(!item) return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15)
                bot.panel(null, `вы удалили роль <@&${item.roleID}> с магазина`, null, null, "admin", true)
                return item.remove()
            }
        })
    } else if(cfg.shopSortType == 2){
        Shop.find({__v: 0}).sort([['cost','descending']]).exec((err, res) => {
            if(err) return bot.dbErr(err.message)
            if(res && res.length > 0){
                let item = res[parseInt(args[0] - 1)]
                if(!item) return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15)
                bot.panel(null, `вы удалили роль <@&${item.roleID}> с магазина`, null, null, "admin", true)
                return item.remove()
            }
        })
    }
}