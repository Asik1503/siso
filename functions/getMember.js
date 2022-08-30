const { Guild, Message } = require("discord.js")

/**
 * @param {Message} message
 * @param {string} member
 * @param {Boolean} canbot
 */

module.exports = (message, member, canbot) => {
    if(canbot == undefined) canbot = false
    if(canbot == false){
        if(message.guild.members.cache.filter(f => !f.user.bot).get(member)){
            return message.guild.members.cache.filter(f => !f.user.bot).get(member)
        } else if(message.mentions.users.first()) {
            if(!message.mentions.users.first().bot){
                return message.guild.member(message.mentions.users.first())
            } else {
                return
            }
        } else {
            return
        }
    } else {
        return message.guild.member(message.guild.members.cache.get(member) || message.mentions.users.first())
    }
}