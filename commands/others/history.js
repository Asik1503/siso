const { Client, Message, MessageEmbed } = require("discord.js")
const colors = require("../../settings/colors")
const getMember = require("../../functions/getMember");
const moment = require("moment");
moment.locale("ru")

/**
 * @param {Client} bot
 * @param {Message} Message
 * @param {Array} args
*/

let types = {
    "ban": "🛑",
    "warn": "⚠",
    "cmute": "💢",
    "vmute": "🔈"
}

module.exports.run = async (bot, message, args) => {
    let memb = getMember(message, args[0]);
    if(!memb) memb = message.member
    if(memb.user.bot == true) memb = message.member
    User.findOne({userID: memb.user.id}, (err, res) => {
        if(err) throw err
        if(res) {
            let nums = "";
            let moders = "";
            let reas = "";
            if(res.history.length > 10) {
                for(let i = res.history.length-1;i >= res.history.length-10;i--) {
                    nums += `**${i + 1}**⠀| ${types[res.history[i].type]}\n`
                    moders += `<@!${res.history[i].moder}>\n`
                    reas += `${moment(res.history[i].date).format("**D** MMM **kk:mm**").toLowerCase()} | **${res.history[i].reas}**\n`
                }
            } else {
                for(let i = res.history.length-1;i >= 0;i--) {
                    nums += `**${i + 1}**⠀| ${types[res.history[i].type]}\n`
                    moders += `<@!${res.history[i].moder}>\n`
                    reas += `${moment(res.history[i].date).format("**D** MMM **kk:mm**").toLowerCase()} | **${res.history[i].reas}**\n`
                }
            }
            let embed = new MessageEmbed()
            .setTitle(` Нарушения ${memb.user.tag} `)
            .setThumbnail(memb.user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
            .setColor(colors.default)
            if(res.history.length == 0) {
                embed.setDescription(`Нарушений не было замечено!`)
            } else {
                embed.addField(`№ | Тип`, nums, true).addField(`Дата | Причина`, reas, true).addField(`Модератор`, moders, true)
            };
            return message.channel.send(embed)
        }
    })
}