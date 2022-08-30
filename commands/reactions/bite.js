const { Client, Message, MessageEmbed } = require("discord.js")
const random = require("random")
const colors = require("../../settings/colors")
const getCmd = require("../../functions/getCmd")
const getMemb = require("../../functions/getMember")
const { reactionPrice } = require("../../settings/config")
const gifs = [
    'https://i.imgur.com/jSqYhns.gif',
    'https://i.imgur.com/lrthhlp.gif',
    'https://i.imgur.com/k5jgu1Y.gif',
    'https://i.imgur.com/Bn0SfIb.gif',
    'https://i.imgur.com/Bdf5EKT.gif',
    'https://i.imgur.com/LmquT01.gif',
    'https://i.imgur.com/gD9COkC.gif']

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return bot.panel(null, `Укажите пользователя`, null, null, "panel", null, 15)
    let memb = getMemb(message, args[0])
    if(!memb) return bot.panel(null, `Пользователь не найден`, null, null, "panel", null, 15)
    if(memb == message.member) return
    let gif = gifs[random.int(0, parseInt(gifs.length - 1))]
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            if(res.crown < reactionPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
            res.crown -= reactionPrice
            res.save()
            let react = new MessageEmbed()
            .setTitle(` Реацкия: ${getCmd(message)} `)
            .setDescription(`${message.author} делает кусь ${memb.user}. Это так мило! (≧▽≦)`)
            .setImage(gif)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor(colors.default)
            message.channel.send(react)
        }
    })
}

module.exports.config = {
    name: "кусь"
}