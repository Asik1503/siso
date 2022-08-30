const mongoose = require("mongoose")
const schema = mongoose.Schema({
    roleID: String,
    cost: Number
})
module.exports = mongoose.model("Shop", schema, "shop")