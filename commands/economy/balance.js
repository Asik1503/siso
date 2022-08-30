const { Client, Message, MessageEmbed } = require("discord.js")
const getMember = require("../../functions/getMember")
const createDbUser = require("../../functions/createDbUser")
const razbitNumber = require("../../functions/razbitNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let memb = getMember(message, args[0])
    if(!memb) memb = message.member
    
    User.findOne({userID: memb.id}, (err, res) => {
        if(err) throw err
        if(res){
            let bal = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setTitle(` Баланс пользователя - ${memb.user.tag}`)
            .addField(`Конфетки ${bot.values.crown}`, `${razbitNumber(res.crown)}`, true)
            .setThumbnail("https://media.discordapp.net/attachments/772484819459768350/772485668336173086/treasure.png")
            .addField(`Витаминки ${bot.values.gem}`, `${razbitNumber(res.gem)}`, true)
            .setColor("#36393f")
            message.channel.send(bal)
        } else {
            res = createDbUser(memb)
            let bal = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setTitle(`Баланс пользователя - ${memb.user.tag}`)
            .addField(`Конфетки ${bot.values.crown}`, `${razbitNumber(res.crown)}`, true)
            .setThumbnail("https://media.discordapp.net/attachments/772484819459768350/772485668336173086/treasure.png")
            .addField(`Витаминки ${bot.values.gem}`, `${razbitNumber(res.gem)}`, true)
            .setColor("#36393f")
            message.channel.send(bal)
        }
    })
}

module.exports.config = {
    alias: ["bal", "money", "$"]
}