const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    publicKeyMod:String,
    publicKeyExp:String,
    password: String,
    address: String,
    device: String
});
module.exports = mongoose.model("user", userSchema);