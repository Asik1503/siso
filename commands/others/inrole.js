const { Client, Message, MessageEmbed } = require("discord.js")
const getRole = require("../../functions/getRole")
const colors = require("../../settings/colors")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    let role = getRole(message, args[0])
    if(!role) return bot.panel(null, "Роль не найдена", null, null, "panel", null, null, 15)
    let members = message.guild.members.cache.filter(f => f.roles.cache.has(role.id))
    if(members.size == 0) return bot.panel(null, "На этой роли никто не стоит", null, null, "panel", null, 15)
    let e = new MessageEmbed()
    .setTitle(`Пользователи на роли ${role.name} (${members.size}):`)
    .setDescription(members.map(f => `• ${f.user}`).join('\n'))
    .setColor(colors.default)
    message.channel.send(e)
}