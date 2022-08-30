const { Client, Message, MessageEmbed } = require("discord.js")
const random = require("random")
const colors = require("../../settings/colors")
const { reactionPrice } = require("../../settings/config")
const getCmd = require("../../functions/getCmd")
const gifs = [
    'https://i.imgur.com/81uG8d5.gif',
    'https://i.imgur.com/SUYyAXi.gif',
    'https://i.imgur.com/3gLUvjp.gif',
    'https://i.imgur.com/57DOnNe.gif',
    'https://i.imgur.com/21epRKV.gif']
/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let gif = gifs[random.int(0, parseInt(gifs.length - 1))]
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            if(res.crown < reactionPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, null)
            res.crown -= reactionPrice
            res.save()
            let react = new MessageEmbed()
            .setTitle(` Реацкия: ${getCmd(message)} `)
            .setDescription(`Котёнок ${message.author} уснул. Давайте будем потише в чате... (~˘▾˘)~`)
            .setImage(gif)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor(colors.default)
            message.channel.send(react)
        }
    })
}

module.exports.config = {
    name: "сплю"
}