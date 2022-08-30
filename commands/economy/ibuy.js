const { Client, Message, MessageEmbed } = require("discord.js");
const User = require("../../data/user.js");
const shop = require("../../settings/ishop.json");
const razbitNumber = require("../../functions/razbitNumber");

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err;
        if(res) {
            let num = args[0];
            if(!num || num == undefined) return;
            if(isNaN(num)) bot.panel(null, "Укажите корректный номер товара", null, null, "panel", null, 15);
            let item = shop.ishop[parseInt(num - 1)];
            if(!item) return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15);
            if(item.price > res.crown) return bot.panel(null, `У вас недостаточно средств`, null, null, "panel", null, 15);
            if(num == 1) {
                res.crown -= item.price;
                res.role1dSize += parseInt(1);
            } else if(num == 2) {
                res.crown -= item.price;
                res.role3dSize += parseInt(1);
            } else if(num == 3) {
                res.crown -= item.price;
                res.role7dSize += parseInt(1);
            } else if(num == 4) {
                res.crown -= item.price;
                res.primeSize += parseInt(1);
            } else if(num == 5) {
                res.crown -= item.price;
                res.channel7dSize += parseInt(1);
            } else {
                return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15);
            };

            res.save();
            return bot.panel(" Успешная покупка ", `вы приобрели **${item.object}**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(item.price)} коронок`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
        };
    });
};