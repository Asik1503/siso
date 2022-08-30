const { Client, VoiceState } = require("discord.js")
const cfg = require("../settings/config")
const createDbUser = require("../functions/createDbUser")

/**
 * @param {Client} bot
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 */

module.exports = async (bot, oldState, newState) => {
    let newUserChannel = newState.channel
    let oldUserChannel = oldState.channel
    
    function getMembers(ch){
        return ch.members.filter(f => !f.user.bot).size
    }

    if(newUserChannel && !oldUserChannel){
        if(newUserChannel.id == cfg.createRoom){
            if(newState.member.user.bot) return
            let room = await newState.member.guild.channels.create(`Комната ${newState.member.user.username}`, {type: "voice", parent: newUserChannel.parent})
            try {
                newState.setChannel(room)
            } catch (error) {
                return room.delete()
            }
            room.createOverwrite(newState.member, {
                MANAGE_CHANNELS: true
            })
            room.createOverwrite(newState.guild.id, {
                VIEW_CHANNEL: false
            })
            room.createOverwrite(cfg.mainGuild, {
                VIEW_CHANNEL: true,
            })
            User.findOne({userID: newState.id}, (err, res) => {
                if(err) throw err
                if(res){
                    res.room = room.id
                    res.save()
                }
            })
        } else {
            let find = false
            newUserChannel.members.filter(m => !m.user.bot).forEach(m => {
                User.findOne({userID: m.id}, (err, res) => {
                    if(err) throw err
                    if(res){
                        if(res.room == newUserChannel.id && find == false){
                            find = true
                            User.findOne({userID: newState.id}, (error, data) => {
                                if(error) throw error
                                if(data){
                                    data.room = res.room
                                    data.save()
                                }
                            })
                        }
                    }
                })
            })
        }
    } else if(oldUserChannel && !newUserChannel){
        User.findOne({userID: oldState.id}, (err, res) => {
            if(err) throw err
            if(res){
                let room = oldState.member.guild.channels.cache.get(res.room)
                if(room && getMembers(room) == 0) oldUserChannel.delete()
            }
        })
    } else if(oldUserChannel !== newUserChannel){
        if(newUserChannel.id == cfg.createRoom){
            if(oldUserChannel.id == cfg.createRoom) return
            let room = await newUserChannel.guild.channels.create(`・Комната ${newState.member.user.username}`, {type: "voice", parent: newUserChannel.parent})
            room.createOverwrite(newState.member, {
                MANAGE_CHANNELS: true
            })
            room.createOverwrite(newState.guild.id, {
                VIEW_CHANNEL: false
            })
            room.createOverwrite(cfg.mainGuild, {
                VIEW_CHANNEL: true,
            })
            try {
                newState.setChannel(room)
            } catch (error) {
                return room.delete()
            }
            User.findOne({userID: newState.id}, (err, res) => {
                if(err) throw err
                if(res){
                    if(oldUserChannel.id == res.room && getMembers(oldUserChannel) == 0) oldUserChannel.delete()
                    res.room = room.id
                    res.save()
                }
            })
        } else {
            User.findOne({userID: oldState.id}, (err, res) => {
                if(err) throw err
                if(res){
                    let room = oldUserChannel.guild.channels.cache.get(res.room)
                    if(room && getMembers(room) == 0) room.delete()
                }
            })
            let find = false
            newUserChannel.members.filter(m => m.id !== newState.id).forEach(m => {
                User.findOne({userID: m.id}, (err, res) => {
                    if(err) throw err
                    if(res){
                        if(res.room == newUserChannel.id && find == false){
                            find = true
                            User.findOne({userID: newState.id}, (error, data) => {
                                if(error) throw error
                                if(data){
                                    if(oldUserChannel.id == res.room && getMembers(oldUserChannel) == 0) oldUserChannel.delete()
                                    data.room = res.room
                                    data.save()
                                }
                            })
                        }
                    }
                })
            })
        }
    }
}