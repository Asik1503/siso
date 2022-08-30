const { Client, Message, MessageEmbed } = require("discord.js");
const User = require("../../data/user.js");
const shop = require("../../settings/ishop.json");
const cfg = require("../../settings/config.js");
const ms = require("ms");
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
            if(!args[0]) return;
            if(isNaN(args[0])) return bot.panel(null, "Укажите корректный номер товара", null, null, "panel", null, 15);
            if(args[0] == 1) {
                if(res.role1dSize == 0) return bot.panel(null, "У вас нет данного товара", null, null, "panel", null, 15);
                let colors = args[1];
                if(!args[1] || args[1] == undefined || !args[1].includes("#")) return bot.panel(null, "Вы не указали цвет роли", null, null, "panel", null, 15);
                let name = args.slice(2).join(" ");
                if(!name) return bot.panel(null, "Вы не указали название роли", null, null, "panel", null, 15);
                message.guild.roles.create({
                    data: {
                        name: name,
                        color: colors
                    }
                }).then(role => {
                    res.role1dRoles.push({
                        timeMS: parseInt(Date.now() + ms("1d")),
                        roleID: role.id,
                        color: colors
                    });
                    res.role1dSize -= 1;
                    message.member.roles.add(role.id)
                    bot.panel(" Успешная активация ", `вы активировали **личную роль на 1 день**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(300)}  конфет`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
                    return res.save();
                });
            } else if(args[0] == 2) {
                if(res.role3dSize == 0) return bot.panel(null, "У вас нет данного товара", null, null, "panel", null, 15);
                let colors = args[1];
                if(!args[1] || args[1] == undefined || !args[1].includes("#")) return bot.panel(null, "Вы не указали цвет роли", null, null, "panel", null, 15);
                let name = args.slice(2).join(" ");
                if(!name) return bot.panel(null, "Вы не указали название роли", null, null, "panel", null, 15);
                message.guild.roles.create({
                    data: {
                        name: name,
                        color: colors
                    }
                }).then(role => {
                    res.role3dRoles.push({
                        timeMS: parseInt(Date.now() + ms("3d")),
                        roleID: role.id,
                        color: colors
                    });
                    res.role3dSize -= 1;
                    message.member.roles.add(role.id)
                    bot.panel(" Успешная активация ", `вы активировали **личную роль на 3 дня**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(500)}  конфет`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
                    return res.save();
                });
            } else if(args[0] == 3) {
                if(res.role7dSize == 0) return bot.panel(null, "У вас нет данного товара", null, null, "panel", null, 15);
                let colors = args[1];
                if(!args[1] || args[1] == undefined || !args[1].includes("#")) return bot.panel(null, "Вы не указали цвет роли", null, null, "panel", null, 15);
                let name = args.slice(2).join(" ");
                if(!name) return bot.panel(null, "Вы не указали название роли", null, null, "panel", null, 15);
                message.guild.roles.create({
                    data: {
                        name: name,
                        color: colors
                    }
                }).then(role => {
                    res.role7dRoles.push({
                        timeMS: parseInt(Date.now() + ms("7d")),
                        roleID: role.id,
                        color: colors
                    });
                    res.role7dSize -= 1;
                    message.member.roles.add(role.id)
                    bot.panel(" Успешная активация ", `вы активировали **личную роль на 7 дней**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(1000)}  конфет`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
                    return res.save();
                });
            } else if(args[0] == 4) {
                if(res.primeSize == 0) return bot.panel(null, "У вас нет данного товара", null, null, "panel", null, 15);
                if(res.primeStatus == true) return bot.panel(null, "У вас активирован прайм статус", null, null, "panel", null, 15);

                res.primeSize -= 1;
                res.primeType.push({
                    timeMS: parseInt(Date.now() + ms("7d"))
                });
                res.primeStatus = true;
                message.member.roles.add(cfg.primeRole)
                bot.panel(" Успешная активация ", `вы активировали **прайм статус на 7 дней**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(2000)}  конфет`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
                return res.save();
            } else if(args[0] == 5) {
                if(res.channel7dSize == 0) return bot.panel(null, "У вас нет данного товара", null, null, "panel", null, 15);
                let name = `・` + args.slice(1).join(" ");
                if(!name) return bot.panel(null, "Вы не указали название канала", null, null, "panel", null, 15);
                message.guild.channels.create(name, {
                        type: "voice",
                        parent: cfg.channelParent,
                        permissionOverwrites: [{
                            id: message.author.id,
                            allow: ["MANAGE_CHANNELS", 'ADMINISTRATOR', 'CONNECT']
                        }, {
                            id: cfg.mainGuild,
                            deny: ['CONNECT']
                        }]
                    }
                ).then(room => {
                    res.channel7dSize -= 1;
                    res.channel7dChannels.push({
                        timeMS: parseInt(Date.now() + ms("7d")),
                        channelID: room.id
                    });
                    bot.panel(" Успешная активация ", `вы активировали **личный канал на 7 дней**\nНадеемся увидеть вас в нашем магазине снова!`, null, null, null, null, null, `стоимость ${razbitNumber(1000)}  конфет`, true, "https://media.discordapp.net/attachments/772484819459768350/774329334088990770/WzmW2yV.gif")
                    return res.save();
                })
            } else {
                return bot.panel(null, `Товар не найден`, null, null, "panel", null, 15);
            };
        };
    });
};