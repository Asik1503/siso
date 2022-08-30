const { GuildMember } = require("discord.js")

/**
 * @param {GuildMember} member
 */

module.exports = member => {
    let dbuser = new User({userID: member.id})
    dbuser.save()
    return dbuser
}