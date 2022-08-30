const { Client } = require("discord.js")
const mongoose = require("mongoose")
const cfg = require("../settings/config")
const getRole = require("../functions/getRole.js");
const getChannel = require("../functions/getChannel.js");
const console = require("../functions/consoleLogger");

/**
 * @param {Client} bot 
*/

module.exports = async (bot) => {
    setInterval(() => {
        bot.user.setActivity("Участников: " + bot.guilds.cache.get(cfg.mainGuild).memberCount, {
            type: "WATCHING"
       })
    }, 60000)

    let role;
    let channel;
    mongoose.connect(cfg.dataURL, { useNewUrlParser: true, useUnifiedTopology: true })
    let link = cfg.inviteURL.replace("?client_id=", `?client_id=${bot.user.id}`)
    console.info(`${bot.user.tag}: В сети!`)
    console.log(link)
    setInterval(() => {
        User.find({inServer: true}, (err, res) => {
            if(err) throw err
            if(res && res.length > 0){
                for(let i = 0;i < res.length;i++){
                    let gl = bot.guilds.cache.get(cfg.mainGuild);
                    let mmb = bot.guilds.cache.get(cfg.mainGuild).members.cache.get(res[i].userID)
                    if(mmb){
                        let update = false;
                        if(res[i].role1dRoles.length > 0 && update == false) {
                            for(let r = 0;r < res[i].role1dRoles.length;r++) {
                                if(res[i].role1dRoles[r].timeMS < Date.now()) {
                                    role = gl.roles.cache.get(res[i].role1dRoles[r].roleID);
                                    if(role) role.delete();
                                    res[i].role1dRoles.splice(r, 1);
                                    update = true;
                                    res[i].save();
                                };
                            };
                        }
                        if(res[i].role3dRoles.length > 0 && update == false) {
                            for(let r = 0;r < res[i].role3dRoles.length;r++) {
                                if(res[i].role3dRoles[r].timeMS < Date.now()) {
                                    role = gl.roles.cache.get(res[i].role3dRoles[r].roleID);
                                    if(role) role.delete();
                                    res[i].role3dRoles.splice(r, 1);
                                    update = true;
                                    res[i].save();
                                };
                            };
                        };
                        if (res[i].role7dRoles.length > 0 && update == false) {
                            for(let r = 0;r < res[i].role7dRoles.length;r++) {
                                if(res[i].role7dRoles[r].timeMS < Date.now()) {
                                    role = gl.roles.cache.get(res[i].role7dRoles[r].roleID);
                                    if(role) role.delete();
                                    res[i].role7dRoles.splice(r, 1);
                                    update = true;
                                    res[i].save();
                                };
                            };
                        };
                        if(res[i].channel7dChannels.length > 0 && update == false) {
                            for(let c = 0;c < res[i].channel7dChannels.length;c++) {
                                if(res[i].channel7dChannels[c].timeMS < Date.now()) {
                                    channel = gl.channels.cache.get(res[i].channel7dChannels[c].channelID);
                                    if(channel) channel.delete();
                                    res[i].channel7dChannels.splice(c, 1);
                                    update = true;
                                    res[i].save();
                                };
                            };
                        };
                        if(res[i].primeStatus == true && update == false) {
                            if(res[i].primeType[0].timeMS < Date.now()) {
                                if(mmb.roles.cache.has(cfg.primeRole)) mmb.roles.remove(cfg.primeRole);
                                res[i].primeStatus = false;
                                res[i].primeType.splice(0, 1);
                                update = true;
                                res[i].save();
                            }
                        };
                        if(mmb.voice.channel && update == false){
                            res[i].voice += 1
                            update = true
                            res[i].save()
                        }
                        if(res[i].warn <= Date.now() && res[i].warn > 0 && update == false){
                            res[i].warn = 0
                            update = true
                            res[i].save()
                            console.log(`Предупреждение было снято с участника ${mmb.user.tag}`)
                        }
                        if(mmb.roles.cache.has(cfg.tmuteRole) && res[i].mutec <= Date.now() && res[i].mutec > 0 && update == false){
                            mmb.roles.remove(cfg.tmuteRole)
                            res[i].mutec = 0
                            update = true
                            res[i].save()
                            console.log(`Мут в чатах был убран с участника ${mmb.user.tag}`)
                        }
                        if(mmb.roles.cache.has(cfg.vmuteRole) && res[i].mutev <= Date.now() && res[i].mutev > 0 && update == false){
                            mmb.roles.remove(cfg.vmuteRole)
                            res[i].mutev = 0
                            update = true
                            res[i].save()
                            console.log(`Мут в войсах был убран с участника ${mmb.user.tag}`)
                        }
                        if(mmb.roles.cache.has(cfg.banRole) && res[i].ban <= Date.now() && res[i].ban > 0 && update == false){
                            mmb.roles.remove(cfg.banRole)
                            res[i].ban = 0
                            update = true
                            res[i].save()
                            console.log(`Бан был убран с участника ${mmb.user.tag}`)
                        }
                    } else if(res[i].leave == false) {
                        res[i].leave = true;
                        res[i].save()
                    }
                }
            }
        })
    }, 1000)
}