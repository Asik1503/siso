const { Client, Message, MessageEmbed } = require("discord.js")
const random = require("random")
const colors = require("../../settings/colors")
const { reactionPrice } = require("../../settings/config")
const getCmd = require("../../functions/getCmd")
const gifs = [
    'https://i.imgur.com/dmIzgiu.gif',
    'https://i.imgur.com/QGi79Fs.gif',
    'https://i.imgur.com/FrJ9Ndm.gif',
    'https://i.imgur.com/Nw70ERF.gif',
    'https://i.imgur.com/QTbKYxH.gif',
    'https://i.imgur.com/z5mkYmk.gif']
/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(args[0] && args[0].toLowerCase() == "чай"){
        let gif = gifs[random.int(0, parseInt(gifs.length - 1))]
        User.findOne({userID: message.author.id}, (err, res) => {
            if(err) throw err
            if(res){
                if(res.crown < reactionPrice) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15)
                res.crown -= reactionPrice
                res.save()
                let react = new MessageEmbed()
                .setTitle(` Реацкия: ${getCmd(message)} чай `)
                .setDescription(`Присоединяйтесь к чаепитию с ${message.author}. (｡◕‿◕｡)`)
                .setImage(gif)
                .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setColor(colors.default)
                message.channel.send(react)
            }
        })
    }
}

module.exports.config = {
    name: "пью"
}