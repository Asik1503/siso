const { Client, Message, MessageEmbed } = require("discord.js")
const createDbUser = require("../functions/createDbUser")
const xpp = require("../functions/getMaxLevelXp")
const colors = require("../settings/colors")
const isUrl = require("is-url");
const helloWords = ["welcome", "добро пожаловать", "welc", "приветствую", "привет", "хай", "хааай", "хаай", "приветик", "ласкаво просимо"];

/**
 * @param {Client} bot
 * @param {Message} message
*/
module.exports = async (bot, message) => {
    if(message.author.bot) return
    if(!message.guild) return
    let msgArray = message.content.split(' ')
    let args = msgArray.slice(1)
    User.findOne({userID: message.author.id}, async (err, res) => {
        if(err) throw err
        if(res){
            res.active += 1
            res.msgs += 1
            res.xp += 0.5;
            if(res.xp >= xpp(res.lvl)){
                res.xp = 0
                res.lvl += 1
            }
            res.save()
        } else {
            createDbUser(message.member)
        }
    })

    helloWords.forEach(async word => {
        try {
            if (message.content.toLowerCase().includes(word)) {
                message.react("💖");
            }
        } catch (err) {
            if (err.name === "ReferenceError")
                console.log("У вас ошибка")
            console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
        }
    })

    if (message.channel.id == '1009885793453621402' && !message.author.bot) {
        if (message.attachments.size <= 0) {
            message.delete();
        } else {
            message.react("💘")
            message.member.roles.add('1010632328118292500')
        }
    }
    bot.panel = function (title, msg, color, author, type, success, sectodel, footer, time, img){
        if(typeof title !== 'string') title = null
        if(typeof msg !== 'string') msg = null
        if(typeof color !== 'string') color = colors.default
        if(color.toLowerCase() == "red") color = colors.red
        if(color.toLowerCase() == "green") color = colors.green
        if(color.toLowerCase() == "default") color = colors.default
        if(color.toLowerCase() == "main") color = colors.main
        if(color.toLowerCase() == "black") color = colors.black
        if(typeof author !== 'boolean') author = false
        if(typeof success !== 'boolean') success = null
        if(typeof sectodel !== 'number') sectodel = 0
        if(typeof footer !== 'string') footer = null
        if(typeof time !== 'boolean') time = false
        if(typeof img !== 'string') img = null
        if(!isUrl(img)) img = null
        if(type == "admin"){
            let panel = new MessageEmbed()
            if(msg !== null) panel.setDescription(`${message.author}, ${msg}`)
            if(success == true){
                if(title !== null) panel.setTitle(title)
                panel.setAuthor("Успешно", "https://cdn.discordapp.com/emojis/772377176766677032.gif?v=1")
                panel.setColor(colors.green).setTimestamp()
            } else if(success == false){
                if(title !== null) panel.setTitle(title)
                panel.setAuthor("Ошибка", "https://cdn.discordapp.com/emojis/772377177462931456.gif?v=1")
                panel.setColor(colors.red)
            } else panel.setColor(color)
            message.channel.send(panel).then(m => {
                if(parseInt(sectodel * 1000) > 0) m.delete({timeout: parseInt(sectodel * 1000)})
            })
        } else if(type == "panel"){
            let panel = new MessageEmbed()
            panel.setColor(color)
            if(title !== null) panel.setTitle(title)
            if(msg !== null) panel.setDescription(msg)
            message.channel.send(panel).then(m => {
                if(parseInt(sectodel * 1000) > 0) m.delete({timeout: parseInt(sectodel * 1000)})
            })
        } else {
            let panel = new MessageEmbed()
            panel.setColor(color)
            if(title !== null) panel.setTitle(title)
            if(msg !== null && author == true) panel.setDescription(msg)
            if(msg !== null && author == false) panel.setDescription(`${message.author}, ${msg}`)
            if(author == true) panel.setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            if(time == true) panel.setTimestamp()
            if(footer !== null) panel.setFooter(footer)
            if(img !== null) panel.setThumbnail(img)
            message.channel.send(panel).then(m => {
                if(parseInt(sectodel * 1000) > 0) m.delete({timeout: parseInt(sectodel * 1000)})
            })
        }
    }
    bot.admin = function (mess, succ){
        if(typeof succ !== 'boolean') succ = null
        message.channel.send(adminPanel({msg: mess, user: message.member, success: succ}))
    }
    bot.test = function (titl, mess, clr){
        message.channel.send(testPanel({msg: mess, user: message.member, color: clr, title: titl}))
    }
    if(!message.content.startsWith(bot.prefix)) return
    let cmd = bot.commands.get(msgArray[0].toLowerCase().slice(bot.prefix.length))
    if(cmd){
        if(cmd.config){
            if(cmd.config.admin && !cmd.config.allowedRoles){
                if(message.member.hasPermission("ADMINISTRATOR")) {
                    return cmd.run(bot, message, args)
                } else return bot.panel(null, "У вас нет прав", null, null, "panel", 15)
            } else if(cmd.config.admin && cmd.config.allowedRoles){
                if(typeof cmd.config.allowedRoles == "string"){
                    if(message.member.roles.cache.has(cmd.config.allowedRoles)) {
                        return cmd.run(bot, message, args)
                    } else return bot.panel(null, "У вас нет прав", null, null, "panel", 15)
                } else {
                    for(let i = 0;i < cmd.config.allowedRoles.length;i++){
                        if(message.member.roles.cache.has(cmd.config.allowedRoles[i]) || message.member.hasPermission("ADMINISTRATOR")) return cmd.run(bot, message, args)
                    }
                }
                return
            }
            if(cmd.config.admin && !cmd.config.allowedUsers){
                return cmd.run(bot, message, args)
            } else if(cmd.config.admin && cmd.config.allowedUsers){
                if(typeof cmd.config.allowedUsers == 'string'){
                    if(message.author.id == cmd.config.allowedUsers) {
                        return cmd.run(bot, message, args)
                    } else return bot.panel(null, "У вас нет прав", null, null, "panel", 15)
                } else {
                    for(let i = 0;i < cmd.config.allowedUsers.length;i++){
                        if(message.author.id == cmd.config.allowedUsers[i] || message.member.hasPermission("ADMINISTRATOR")) return cmd.run(bot, message, args)
                    }
                }
                return
            }
            if(!cmd.config.admin && !cmd.config.allowedRoles && !cmd.config.allowedUsers) return cmd.run(bot, message, args)
        } else cmd.run(bot, message, args)
    }
}