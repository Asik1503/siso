const { Client, Message, MessageEmbed } = require("discord.js")
const cfg = require("../../settings/config")
const razbitNumber = require("../../functions/razbitNumber")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot,message,args) => {
    let numbers = {
        0: "**0.**",
        1: "**1.**",
        2: "**2.**",
        3: "**3.**",
        4: "**4.**",
        5: "**5.**",
        6: "**6.**",
        7: "**7.**",
        8: "**8.**",
        9: "**9.**",
        10: "**10.**",
        11: "**11.**",
        12: "**12.**",
        13: "**13.**",
        14: "**14.**",
        15: "**15.**",
        16: "**16.**",
        17: "**17.**",
        18: "**18.**",
        19: "**19.**",
        20: "**20.**"
    };
    let ishop = new MessageEmbed()
    .setTitle(" Магазин ролей ")
    .setFooter("!ibuy <номер> для покупки・!money для просмотра баланса")
    .setColor("#36393f")
    
    Shop.find({__v: 0}, (err, res) => {
        if(err) return bot.dbErr(err.message)
        if(res && res.length > 0){
            let shop = ""
            let cost = ""
            for(let i = 0;i < res.length;i++){
                shop = shop + `${numbers[i + 1]} <@&${res[i].roleID}>\n`
                cost = cost + `${razbitNumber(res[i].cost)}${bot.values.crown}\n`
            }
            let text = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setTitle(` Магазин ролей `)
            .addField(`№ Роль:`, shop, true)
            .addField(`Стоимость:`, cost, true)
            //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673376550962/Shop1.gif")
            .setFooter(`${bot.prefix}buy <номер> для покупки・${bot.prefix}money для просмотра баланса`)
            .setColor("#36393f")
            message.channel.send(text)
        } else {
            let no = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
            .setTitle(` Магазин ролей `)
            .addField(`№ Роль:`, `${numbers[0]} Пусто`, true)
            .addField(`Стоимость:`, `0${bot.values.crown}`, true)
            //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673376550962/Shop1.gif")
            .setFooter(`${bot.prefix}buy <номер> для покупки・${bot.prefix}money для просмотра баланса`)
            .setColor("#36393f")
            message.channel.send(no)
        }
    })
}