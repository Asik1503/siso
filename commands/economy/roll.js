const { Client, Message, MessageEmbed, DataResolver } = require("discord.js")
let getMember = require("../../functions/getMember")
const colors = require("../../settings/colors")

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
*/

module.exports.run = async (bot, message, args) => {
    function random(min, max) {
        return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
    if(!args[0]) return bot.panel(null, "Укажите участника", null, null, "panel", null, 15)
    let memb = getMember(message, args[0])
    if(!memb) return bot.panel(null, "Участник не был найден", null, null, "panel", null, 15);
    if(memb.user.bot == true) return bot.panel(null, "С ботами играть нельзя", null, null, "panel", null, 15);
    if(memb.user.id == message.author.id) return bot.panel(null, "Играть с собой? Да ладно, это же не интересно!", null, null, "panel", null, 15);
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err
        if(res) {
            User.findOne({userID: memb.user.id}, (error, data) => {
                if(error) throw error
                if(data) {
                    if(!args[1]) return bot.panel(null, "Укажите сумму", null, null, "panel", null, 15);
                    if(isNaN(args[1])) return bot.panel(null, "Укажите корректную сумму", null, null, "panel", null, 15);
                    if(0 >= args[1]) return bot.panel(null, "Минимальная ставка - 1", null, null, "panel", null, 15);
                    if(args[1] > res.crown) return bot.panel(null, "Недостаточно средств", null, null, "panel", null, 15);
                    if(args[1] > data.crown) return bot.panel(null, `У ${memb.user} недостаточно средств`, null, null, "panel", null, 15);

                    let nogame = new MessageEmbed()
                    .setColor(colors.default)
                    .setTitle(` Кубики `)
                    .setDescription(`${memb.user} не хочет с вами играть`)
                    let ignore = new MessageEmbed()
                    .setColor(colors.default)
                    .setTitle(` Кубики `)
                    .setDescription(`${memb.user} вас проигнорил`)
                    let e = new MessageEmbed()
                    .setTitle(` Кубики `)
                    .setColor(colors.default)
                    .setDescription(`${message.member} Хочет сыграть с вами ${memb.user} в кубики, что скажете?`)
                    message.channel.send(e).then(msg => {
                        msg.react("✅")
                        msg.react("❌")
                        let ok = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '✅' && user.id == memb.user.id, { time: 30000 });
                        let no = msg.createReactionCollector((reaction, user) => reaction.emoji.name === '❌' && user.id == memb.user.id, { time: 30000 });
                        no.on("end", () => {
                            msg.reactions.removeAll()
                            ok.stop()
                            return no.stop()
                        })
                        ok.on("collect", () => {
                            msg.reactions.removeAll()
                            let gameProcess = ` ${message.member}  vs.  ${memb.user} \n\n`
                            let rUserCount = 0;
                            let mUserCount = 0;
                            let game = new MessageEmbed()
                            .setColor(colors.default)
                            .setTitle(" Кубики ")
                            .setImage('https://media.discordapp.net/attachments/837916753346035752/837921920317784094/dice.gif')
                            for (let i = 0; i < 6; i++) {
                                let rand1 = Math.floor(Math.random() * 6) + 1;
                                let rand2 = Math.floor(Math.random() * 6) + 1;
                                let rand3 = Math.floor(Math.random() * 6) + 1;
                                let rand4 = Math.floor(Math.random() * 6) + 1;
        
                                gameProcess += '`' + `   ${rand1} и ${rand2}     |     ${rand3} и ${rand4}   ` + '`\n'
        
                                rUserCount += rand1 + rand2;
                                mUserCount += rand3 + rand4;
        
                                msg.edit(game.setDescription(gameProcess));
                            }
                            gameProcess += '`' + `    ${rUserCount}       |       ${mUserCount}    ` + '`\n\n'
                            if(rUserCount > mUserCount) {
                                gameProcess += `${message.member} выиграл **${args[1]}**${bot.values.crown}`
                                res.crown += parseInt(args[1])
                                res.save()
                                data.crown -= parseInt(args[1])
                                data.save()
                            } else if(mUserCount > rUserCount) {
                                gameProcess += `${memb.user} выиграл **${args[1]}**${bot.values.crown}`
                                res.crown -= parseInt(args[1])
                                res.save()
                                data.crown += parseInt(args[1])
                                data.save()
                            } else {
                                gameProcess += `Ничья!`
                            }
                            msg.edit(game.setDescription(gameProcess));
                            no.stop()
                            return ok.stop()
                        })
                        no.on("collect", () => {
                            msg.reactions.removeAll()
                            msg.edit(nogame)
                            ok.stop()
                            return no.stop()
                        })
                    })
                }
            })
        }
    })
}