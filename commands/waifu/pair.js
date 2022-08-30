const { Client, Message, MessageEmbed } = require("discord.js")
const getMember = require("../../functions/getMember")
const cfg = require("../../settings/config")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res) {
            if(res.marryID !== "0") return bot.panel(null, `У тебя уже имеется пара`, null, null, "panel")
            let memb = getMember(message, args[0])
            if(!memb || memb.user.bot == true) return bot.panel(null, "Участник не найден", null, null, "panel")
            if(memb.id == message.author.id) return bot.panel(null, "Встречаться с собой? Да ладно, это же не возможно!", null, null, "panel")
            if(cfg.marryPrice > res.crown) return bot.panel(null, "Недостаточно средств", null, null, "panel")
            User.findOne({userID: memb.user.id}, (error, data) => {
                if(error) throw error
                if(data) {
                    if(data.marryID !== "0") return bot.panel(null, `К сжалению ${memb.user} уже женат (-а)`, null, null, "panel")
                    let marry = new MessageEmbed()
                    .setTitle(` Предложение `)
                    .setDescription(`Я жизни без тебя не представляю, хочу идти с тобой по жизненном пути. Тебя люблю, тебя я обожаю, и делаю тебе я предложения сердца и руки!\n\n${message.author} отправляет предложение стать парой ${memb.user}, мы в предвкушении новой пары...`)
                    .setImage(`https://cdn.discordapp.com/attachments/839023003182170135/842705891375448134/unknown.png`)
                    .setColor("#36393f")
                    let msgs = {
                        ignore: new MessageEmbed()
                        .setDescription(`${memb.user} проигнорировал(а) тебя`)
                        .setColor("#36393f"),
                        deny: new MessageEmbed()
                        .setDescription(`${memb.user} отказался (-ась) от отношений`)
                        .setColor("#36393f"),
                        ok: new MessageEmbed()
                        .setAuthor(message.member.displayName, message.author.displayAvatarURL({format: "png", dynamic: true, size: 1024}))
                        .setTitle(' Новенькая пара влюблённых ')
                        .setDescription(`${message.author} и ${memb.user} официально стали парой этого сервера!\n\nПоздравляю вас с созданием собственного любовного домика, долголетия желаю вашей любви, вам – влюбленной паре! Такого долголетия, которое согласно превратиться в вечность.`)
                        .setImage("")
                        .setColor("#36393f")
                    }
                    message.channel.send(memb.user, marry).then(msg => {
                        msg.react("✅")
                        msg.react("❌")
                        const filter_ok = (reaction, user) => reaction.emoji.name === '✅' && user.id === memb.id;
                        const filter_deny = (reaction, user) => reaction.emoji.name === '❌' && user.id === memb.id;
                        const ok = msg.createReactionCollector(filter_ok, { max: 1, time: cfg.marryTime});
                        const deny = msg.createReactionCollector(filter_deny, { max: 1, time: cfg.marryTime});
                        ok.on("end", async () => {
                            msg.reactions.removeAll();
                            msg.edit(message.author, msgs.ignore)
                            deny.stop()
                            return ok.stop()
                        });
                        deny.on("collect", async () => {
                            msg.reactions.removeAll();
                            msg.edit(message.author, msgs.deny)
                            ok.stop()
                            return deny.stop()
                        })
                        ok.on("collect", async () => {
                            msg.reactions.removeAll();
                            let prnt = message.guild.channels.cache.get(cfg.marryParent);
                            message.guild.channels.create(`${message.author.username} 💞 ${memb.user.username}`, {type: "voice", parent: prnt, userLimit: 2}).then(room => {
                                room.createOverwrite(message.author, {
                                    VIEW_CHANNEL: true,
                                    CONNECT: true,
                                    SPEAK: true
                                });
                                room.createOverwrite(memb, {
                                    VIEW_CHANNEL: true,
                                    CONNECT: true,
                                    SPEAK: true
                                });
                                room.createOverwrite(message.guild.id, {
                                    VIEW_CHANNEL: true,
                                    CONNECT: false

                                })
                                res.marryID = memb.user.id
                                res.crown -= cfg.marryPrice;
                                data.marryID = message.author.id
                                res.save()
                                data.save()
                                let dbPair = new Pair({authorID: message.author.id, memberID: memb.user.id, roomID: room.id})
                                dbPair.save()
                                msg.edit(msgs.ok)
                                deny.stop()
                                return ok.stop()
                            })
                        })
                    })
                }
            })
        }
    })
}