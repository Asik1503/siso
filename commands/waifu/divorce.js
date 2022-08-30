const { Client, Message } = require("discord.js")
const getChannel = require("../../functions/getChannel")
const getMember = require("../../functions/getMember")

/**
 * @param {Client} bot 
 * @param {Message} message 
 * @param {Array} args 
*/

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, async (err, res) => {
        if(err) throw err
        if(res) {
            if(res.marryID == "0") return bot.panel(null, "Вы не женаты", null, null, "panel");
            Pair.findOne({authorID: message.author.id}, (e, pairs) => {
                if(e) throw e
                if(pairs) {
                    let room = getChannel(message, pairs.roomID)
                    if(room) room.delete()
                    let memb = getMember(message, res.marryID)
                    User.findOne({userID: res.marryID}, (error, data) => {
                        if(error) throw error
                        if(data) {
                            res.marryID = "0"
                            data.marryID = "0"
                            res.save()
                            data.save()
                            bot.panel("  Расставание ", `"${message.author} и ${memb.user}, Расставание — великая штука. Кажется, что оно всегда дает больше, чем забирает. Комната была удалена.\n\nИ такое в жизни случается, ничто не вечно в этом мире, тем более любовь. Встретите еще тех самых любимых людей."`, null, null, "panel");
                            return pairs.remove()
                        }
                    })
                } else {
                    Pair.findOne({memberID: message.author.id}, (er, mempairse) => {
                        if(er) throw er
                        if(mempairse) {
                            let room = getChannel(message, mempairse.roomID)
                            if(room) room.delete()
                            let memb = getMember(message, res.marryID)
                            User.findOne({userID: res.marryID}, (error, data) => {
                                if(error) throw error
                                if(data) {
                                    res.marryID = "0"
                                    data.marryID = "0"
                                    res.save()
                                    data.save()
                                    bot.panel("  Расставание ", `"${message.author} и ${memb.user}, Расставание — великая штука. Кажется, что оно всегда дает больше, чем забирает. Комната была удалена.\n\nИ такое в жизни случается, ничто не вечно в этом мире, тем более любовь. Встретите еще тех самых любимых людей."`, null, null, "panel");
                                    return mempairse.remove()
                                }
                            })
                        } else {
                            return bot.panel(null, "Профиль пары не был найден", null, null, "panel");
                        }
                    })
                }
            })
        }
    })
}