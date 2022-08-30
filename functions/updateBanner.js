const Active = require("../data/active.js")
const Canvas = require("canvas")
const moment = require("moment")
const cfg = require("../settings/config")
const ms = require("ms")

module.exports = async function(bot, guild, status) {
    let act = await Active.findOne({guildID: cfg.mainGuild})
    User.find({inTopChat: true}).sort([['active','descending']]).exec(async (err, res) => {
        if(err) throw err
        if(res && res.length > 0) {
            if(Date.now() > parseInt(act.date + ms("2h"))) {
                for(let i = 0;i < res.length;i++) {
                    Active.findOne({guildID: cfg.mainGuild}, (error, actives) => {
                        if(error) throw error
                        if(actives) {
                            actives.userID = res[0].userID
                            actives.date = Date.now()
                            actives.save()
                            res[i].active = 0
                            res[i].save()
                        }
                    })
                }
            }
            let id = act.userID
            let m = bot.guilds.cache.get(guild.id).members.cache.get(id)
            if(!m) m = bot.guilds.cache.get(guild.id).members.cache.get(guild.owner.user.id)
            const canvas = Canvas.createCanvas(960, 540)
            const ctx = canvas.getContext('2d')
            const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/838704882650710037/853920755468468234/silentiumbanner.png")
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        
            // Nickname
            ctx.fillStyle = "#f9fcfc"
            ctx.font = "50px Arial"
            ctx.fillText(m.displayName.length >= 11 ? m.displayName.slice(0, 8) + "..." : m.displayName, 182, 256)
            //Status
            ctx.fillStyle = "#bec0bf"
            ctx.font = "40px Arial"
            ctx.fillText(m.presence.activities[0] !== undefined ? m.presence.activities[0].state.length >= 20 ? m.presence.activities[0].state.slice(0, 17) + "..." : m.presence.activities[0].state : "Пусто", 182, 306)
            // Time
            ctx.font = "40px Arial"
            ctx.fillStyle = "#f9fcfc"
            ctx.fillText(moment.utc(Date.now()).utcOffset("+03:00").format("kk:mm"), 535, 242)
            // Stats Voice
            ctx.font = "70px Arial"
                ctx.textAlign = "center"
            ctx.fillText(guild.members.cache.filter(u => u.voice.channel).size, 803, 270, 274)
            ctx.fillText(guild.memberCount, 803, 432, 274)
            // Avatar
            ctx.beginPath()
            ctx.arc(87, 282, 70, 0, 2*Math.PI)
            ctx.closePath()
            ctx.clip()
            const avatar = await Canvas.loadImage(m.user.displayAvatarURL({format: "png"}))
            ctx.drawImage(avatar, 12, 206, 150, 150)
        
            if(status && status == true) {
                return guild.setBanner(canvas.toBuffer())
            } else {
                return canvas.toBuffer()
            }
        }
    })
}