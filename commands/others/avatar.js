const { Client, Message, MessageEmbed } = require("discord.js")
const getMemb = require("../../functions/getMember")
const colors = require("../../settings/colors")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let memb = getMemb(message, args[0], true)
    if(!memb) memb = message.member
    
    let avatar = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
    .setTitle(` Аватар пользователя ${memb.user.tag} `)
    .setImage(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
    .setColor(colors.default)
    message.channel.send(avatar)
}