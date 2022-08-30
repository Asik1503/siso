const Discord = require("discord.js");
const os = require("os");
const colors = require("../../settings/colors.js");
const cnvTime = require("../../functions/convertVoiceTime")
const humanize = require('humanize');

module.exports.run = async (bot, message, args) => {
    let ram = `${humanize.filesize(process.memoryUsage().heapUsed)}/${humanize.filesize(os.totalmem())}`;
    let OS = `${os.type().replace('Windows_NT', os.version())} ${os.arch()}`;
    let e = new Discord.MessageEmbed()
    .setTitle(`Информация о боте ${bot.user.username}`)
    .setThumbnail(bot.user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
    .setColor(bot.user.displayHexColor === undefined || bot.user.displayHexColor === "#000000" ? colors.default : bot.user.displayHexColor)
    .setDescription(`\`\`\`scss\nPing      :: ${bot.ws.ping}ms\nShards    :: ${bot.ws.totalShards}\nUptime    :: ${cnvTime(bot.uptime/1000)}\`\`\`\`\`\`scss\nProcessor :: ${os.cpus()[0].model.replace("Intel(R)", "Intel").replace(" CPU E5-1650 v4 @ 3.60GHz", "").replace(" CPU @ 2.90GHz", "").replace(" Core(TM)", "").replace("Xeon(R)", "Xeon")}\nSpeed     :: ${os.cpus()[0].speed/1000}Hz\nCore      :: ${os.cpus().length}\`\`\`\`\`\`scss\nOS        :: ${OS}\nRam       :: ${ram}\`\`\``)
    return message.channel.send(e);
};