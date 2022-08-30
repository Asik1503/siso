const Discord = require("discord.js")
const User = require("../data/user.js")
const colors = require("../settings/colors.js")
const cfg = require("../settings/config")

module.exports = async (bot, member) => {
    let res = await User.findOne({userID: member.id})
    if(!res) {
        res = new User({userID: member.id})
    }
    if (member.user.createdTimestamp > Date.now() - (1000 * 60 * 60 * 24 * 7)) {
        if(!member.roles.cache.has(cfg.newAccountRole)) member.roles.add(cfg.newAccountRole)
        let accountKick = new Discord.MessageEmbed()
        .setColor(colors.default)
        .setDescription("Вы были кикнуты с сервера **Бордель**.\n\nПричина: Аккаунт был создан менее 7 дней назад.")
        .setTimestamp();
    }
    let embed = new Discord.MessageEmbed()
    .setColor(colors.default)
    .setTitle('Встречаем нового участника!')
    .setDescription(`${member}, добро пожаловать в наше комьюнити! Надеюсь, тебе у нас понравится и ты останешься с нами. Рекомендую тебе ознакомиться с каналами <#1009884337354850445> и <#1009884766541205605>`)
    .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL({format: "png", dynamic: true, size: 1024})}`)
    .setThumbnail(`${member.user.displayAvatarURL({format: "png", dynamic: true, size: 1024})}`)
    let channel = bot.guilds.cache.get(cfg.mainGuild).channels.cache.get(cfg.welcomeChannel);
    if(channel) return channel.send(member, embed)
    let role = bot.guilds.cache.get(cfg.mainGuild).roles.cache.get(cfg.memberRole);
    if(role) return member.role.add(cfg.memberRole)
} 
