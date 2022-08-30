const { Client, Message } = require("discord.js")
const getMemb = require("../../functions/getMember.js");

/**
 * @param {Client} bot
 * @param {Message} message
 * @param {Array} args
 */

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR") || !bot.admins.includes(message.author.id)) return;
    let m = getMemb(message, args[0]);
    if(!m) bot.panel(null, `Пользователь не найден`, null, null, "panel", null, 15);
    let reason = args.slice(1).join(" ");

    m.kick();
    return bot.panel(null, `участник ${m.user} был выгнан ${reason ? `по причине: **` + reason + "**" : " "}`, null, null, "admin", true)
}