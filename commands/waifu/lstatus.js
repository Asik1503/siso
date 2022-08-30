const { Client, Message } = require("discord.js")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    Pair.findOne({authorID: message.author.id}, (e, pair) => {
        if(e) throw e
        if(pair) {
            let status = args.join(" ")
            if(!status) return;
            pair.status = status
            pair.save()
            return bot.panel(null, `${message.author}, вы изменили парный статус на:\n\`\`\`${status}\`\`\``, null, null, "panel")
        } else {
            Pair.findOne({memberID: message.author.id}, (err, pairs) => {
                if(err) throw err
                if(pairs) {
                    let status = args.join(" ")
                    if(!status) return;
                    pairs.status = status
                    pairs.save()
                    return bot.panel(null, `${message.author}, вы изменили парный статус на:\n\`\`\`${status}\`\`\``, null, null, "panel")
                } else {
                    return bot.panel(null, `У вас нет пары`, null, null, "panel") 
                }
            })
        }
    })
}