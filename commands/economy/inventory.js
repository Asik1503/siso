const { Client, Message, MessageEmbed } = require("discord.js");
const User = require("../../data/user.js");
const colors = require("../../settings/colors")
const getMember = require("../../functions/getMember")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    let memb = getMember(message, args[0])
    if(!memb) memb = message.member

    User.findOne({userID: memb.id}, (err, res) => {
        if(err) throw err;
        if(res) {
            let embed = new MessageEmbed()
            .setColor(colors.default)
            .setThumbnail(memb.user.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setTitle(` Инвентарь пользователя - ${memb.user.tag} `)
            .addField(`Предмет:`, `<:1d:988492280077893632> Личная роль на 1 день\n<:3d:988491836769321010> Личная роль на 3 дня\n<:7drole:988468268937404527> Личная роль на 7 дней\n<:elite:988493245518581821> Elite статус на 7 дней\n<:selfch:988493850744090714> Личная комната на 7 дней`, true)
            .addField(`Количество:`, `${res.role1dSize}\n${res.role3dSize}\n${res.role7dSize}\n${res.primeSize}\n${res.channel7dSize}`, true)
            return message.channel.send(embed);
        };
    });
};