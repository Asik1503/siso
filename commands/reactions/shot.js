const { Client, Message, MessageEmbed } = require("discord.js")
const random = require("random")
const getMemb = require("../../functions/getMember")
const colors = require("../../settings/colors")
const getCmd = require("../../functions/getCmd")
const { reactionPrice } = require("../../settings/config")
const gifs = [
    'https://i.imgur.com/nvmZcGn.gif',
    'https://i.imgur.com/A1vkivG.gif',
    'https://i.imgur.com/eBWsqbE.gif']
/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!args[0]) return bot.panel(null, `Укажите пользователя`, null, null, "panel", null, 15)
    let memb = getMemb(message, args[0])
    if(!memb) return bot.panel(null, `Пользователь не найден`, null, null, "panel", null, 15)
    let gif = gifs[random.int(0, parseInt(gifs.length - 1))]
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res){
            if(res.crown < reactionPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
            res.crown -= reactionPrice
            res.save()
            let react = new MessageEmbed()
            .setTitle(` Реацкия: ${getCmd(message)} `)
            .setDescription(`${message.author} выстрелил в ${memb.user}. Я надеюсь, что не насмерть... ヘ(>_<ヘ)`)
            .setImage(gif)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor(colors.default)
            message.channel.send(react)
        }
    })
}

module.exports.config = {
    name: "выстрелить"
}