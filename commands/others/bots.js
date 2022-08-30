const { Client, Message, MessageEmbed } = require("discord.js")
const getMemb = require("../../functions/getMember")
const colors = require("../../settings/colors")
/**
const bots = ["235088799074484224", "252128902418268161", "234395307759108106", "201503408652419073", "184405311681986560", "614109280508968980"]
const botsinfo = {
    "235088799074484224": "<:rythm:772377176381063188>.$",
    "252128902418268161": "<:rythm2:772377176128749568>.>",
    "234395307759108106": "<:groovy:772377176224956457>.-",
    "201503408652419073": "<:octave:772377176224956426>._",
    "184405311681986560": "<:fredboat:772377176150376458>.;;",
    "614109280508968980": "<:chip:772377176125079562>.ch!"
}
*/
/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

 const bots = []
 const botsinfo = []
module.exports.run = async (bot, message, args) => {
    let info = new MessageEmbed()
    .setTitle(" Музыкальные боты ")
    .setColor(colors.default)
    for(let i = 0;i < bots.length;i++){
        let bot = getMemb(message, bots[i], true)
        let name = botsinfo[bots[i]].split(".")[0]
        let prefix = botsinfo[bots[i]].split(".")[1]
        let status = "<a:Yes:772377176766677032>"
        if(bot.voice.channel) status = "<a:No:772377177462931456>"
        info.addField(`${name} ${bot.user.username}`, `>>> Префикс: \`${prefix}\`\nСостояние: ${status}`, true)
    }
    message.channel.send(info)
}