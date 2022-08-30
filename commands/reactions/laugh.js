const { Client, Message, MessageEmbed } = require("discord.js")
const random = require("random")
const colors = require("../../settings/colors")
const { reactionPrice } = require("../../settings/config")
const getCmd = require("../../functions/getCmd")
const gifs = [
    'https://i.imgur.com/UAympEm.gif',
    'https://i.imgur.com/U6iac8Y.gif',
    'https://i.imgur.com/pPyvbcL.gif',
    'https://i.imgur.com/iqxGnXv.gif',
    'https://i.imgur.com/0fxAS48.gif',
    'https://i.imgur.com/l0fdeut.gif',
    'https://i.imgur.com/n4bqCIW.gif',
    'https://i.imgur.com/zv0tKLF.gif']
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
            .setDescription(`Ха-ха~ ${message.author} смеётся.`)
            .setImage(gif)
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor(colors.default)
            message.channel.send(react)
        }
    })
}

module.exports.config = {
    name: "смеюсь"
}