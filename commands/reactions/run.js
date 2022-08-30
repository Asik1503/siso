const { Client, Message, MessageEmbed } = require("discord.js")
const random = require("random")
const colors = require("../../settings/colors")
const getCmd = require("../../functions/getCmd")
const { reactionPrice } = require("../../settings/config")
const gifs = [
    'https://i.imgur.com/utB7Y3b.gif',
      'https://i.imgur.com/56zaBNi.gif',
      'https://i.imgur.com/ZCeGtBg.gif',
      'https://i.imgur.com/esBiUR5.gif',
      'https://i.imgur.com/8IK85kQ.gif',
      'https://i.imgur.com/RBHRULc.gif',
      'https://i.imgur.com/IU5IIoz.gif',
      'https://i.imgur.com/opzued9.gif',
      'https://i.imgur.com/zRfQMHq.gif']
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
            if(res.crown < reactionPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
            res.crown -= reactionPrice
            res.save()
            let react = new MessageEmbed()
            .setTitle(` Реацкия: ${getCmd(message)} `)
            .setDescription(`Смотри куда бежишь, ${message.author}! Там может быть стена... (¬_¬)`)
            .setImage(gif)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor(colors.default)
            message.channel.send(react)
        }
    })
}

module.exports.config = {
    name: "бежать"
}