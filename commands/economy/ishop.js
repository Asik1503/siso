const { Client, Message, MessageEmbed } = require("discord.js");
const shop = require("../../settings/ishop.json");

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed();
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
    let txt = "";
    let price = "";
    if(0 < shop.ishop.length) {
        for(let i = 0;i < shop.ishop.length;i++) {
            txt += `${numbers[i + 1]}${shop.ishop[i].object} на ${shop.ishop[i].time.replace("d", "д").replace("m", "м")}\n`;
            price += `${parseInt(shop.ishop[i].price)}${bot.values.crown}\n`;
        }
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
        .setTitle(` Магазин предметов `)
        .addField(`№ Предмет:`, txt, true)
        .addField(`Стоимость:`, price, true)
        //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673376550962/Shop1.gif")
        .setFooter(`${bot.prefix}ibuy <номер> для покупки・${bot.prefix}money для просмотра баланса`)
        .setColor("#36393f");
        message.channel.send(embed);
    } else {
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
        .setTitle(` Магазин предметов `)
        .addField(`№ Роль:`, `${numbers[0]} Пусто`, true)
        .addField(`Стоимость:`, `0${bot.values.crown}`, true)
        //.setImage("https://cdn.discordapp.com/attachments/852532626878103632/852532673376550962/Shop1.gif")
        .setFooter(`${bot.prefix}ibuy <номер> для покупки・${bot.prefix}money для просмотра баланса`)
        .setColor("#36393f");
        message.channel.send(embed);
    };
};