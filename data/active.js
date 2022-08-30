const mongoose = require("mongoose")
const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    
    date: {type: Number, default: Date.now()}
})
module.exports = mongoose.model("Active", schema, "active")