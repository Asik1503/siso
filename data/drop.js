const mongoose = require("mongoose")
const schema = mongoose.Schema({
    channelID: String,
    count: Number
})
module.exports = mongoose.model("Drop", schema, "drop")