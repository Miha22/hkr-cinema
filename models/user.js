const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    role: {
        type: String,
        default: "Basic",
        required: true,
    },
});

const user = mongoose.model("user", userschema);
module.exports = user;