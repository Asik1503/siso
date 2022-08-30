const { Client, Message } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return bot.panel(null, `Укажите пользователя`, null, null, "panel", null, 15)
    if(isNaN(args[0])) return
    if(args[0].length !== 18) return
    let reas = args.slice(1).join(' ')
    if(!reas) reas = "Без причины."
    message.guild.members.ban(args[0], {reason: `${message.author.tag}: ${reas}`})
    bot.panel(null, `пользователю <@!${args[0]}> была выдана блокировка по причине: **${reas}**`, null, null, "admin", true)
}

module.exports.config = {
    admin: true
}