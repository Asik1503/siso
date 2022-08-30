const { Client, Message } = require("discord.js");
const ms = require("ms");
const cnvTime = require("../../functions/timelyTime");
const cfg = require("../../settings/config");
const razbitNumber = require("../../functions/razbitNumber");

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    User.findOne({userID: message.author.id}, (err, res) => {
        if(err) throw err;
        if(res){
            if(Date.now() < res.timely) return bot.panel(`Ежедневная награда`, `Ты часто используешь ежедневную награду 〒﹏〒\n\n> Приходи через **${cnvTime(res.timely)}** часов, чтобы получить ещё конфет ${bot.values.crown}!`);
            res.crown += cfg.timelyReward;
            res.timely = parseInt(Date.now() + ms(cfg.timelyCooldown));
            res.save();
            bot.panel(" Ежедневная награда ", `Ежедневные бесплатные ${razbitNumber(cfg.timelyReward)}${bot.values.crown} конфет!\n\n> Через 12 часов приходи ещё, я буду ждать ヽ(♡‿♡)ノ`);
        }
    })
}