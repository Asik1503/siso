const mongoose = require("mongoose")
const schema = mongoose.Schema({
    authorID: String,
    memberID: String,
    roomID: String,

    status: {type: String, default: "[ Без статуса ]"},
    bank: {type: Number, default: 0},
    date: {type: Number, default: Date.now()},
    payment: {type: Number, default: Date.now()}
})
module.exports = mongoose.model("Pair", schema, "pair")